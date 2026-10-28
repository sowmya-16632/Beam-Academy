package com.beam.service;

import com.beam.dto.DashboardStatsDto;
import com.beam.dto.RecentActivityDto;
import com.beam.entity.*;
import com.beam.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    private final AuthService authService;
    private final TopicCompletionRepository topicRepo;
    private final PracticeAttemptRepository practiceRepo;
    private final AptitudeAttemptRepository aptitudeRepo;
    private final InterviewPracticeRepository interviewRepo;

    // Standard syllabus counts for placement readiness
    private static final int TOTAL_JAVA_TOPICS = 11;
    private static final int TOTAL_SQL_TOPICS = 12;
    private static final int TOTAL_DSA_PROBLEMS = 12;
    private static final int TARGET_APTITUDE_TESTS = 5;
    private static final int TARGET_INTERVIEW_QUESTIONS = 20;

    public ProgressService(AuthService authService,
                           TopicCompletionRepository topicRepo,
                           PracticeAttemptRepository practiceRepo,
                           AptitudeAttemptRepository aptitudeRepo,
                           InterviewPracticeRepository interviewRepo) {
        this.authService = authService;
        this.topicRepo = topicRepo;
        this.practiceRepo = practiceRepo;
        this.aptitudeRepo = aptitudeRepo;
        this.interviewRepo = interviewRepo;
    }

    public DashboardStatsDto getDashboardStats(Long userId) {
        User user = authService.getEntityById(userId);

        long completedJava = topicRepo.countByUserAndCourse(user, "java");
        long completedSql = topicRepo.countByUserAndCourse(user, "sql");
        long solvedDsa = practiceRepo.findByUserOrderByAttemptedAtDesc(user).stream()
                .filter(a -> "SOLVED".equalsIgnoreCase(a.getStatus()))
                .map(PracticeAttempt::getProblemSlug)
                .distinct()
                .count();
        long aptitudeCount = aptitudeRepo.countByUser(user);
        long masteredInterview = interviewRepo.countByUserAndMastered(user, true);

        int javaPercent = (int) Math.min(100, Math.round(((double) completedJava / TOTAL_JAVA_TOPICS) * 100));
        int sqlPercent = (int) Math.min(100, Math.round(((double) completedSql / TOTAL_SQL_TOPICS) * 100));
        int dsaPercent = (int) Math.min(100, Math.round(((double) solvedDsa / TOTAL_DSA_PROBLEMS) * 100));
        int aptitudePercent = (int) Math.min(100, Math.round(((double) aptitudeCount / TARGET_APTITUDE_TESTS) * 100));
        int interviewPercent = (int) Math.min(100, Math.round(((double) masteredInterview / TARGET_INTERVIEW_QUESTIONS) * 100));

        int overallPercent = (javaPercent + sqlPercent + dsaPercent + aptitudePercent + interviewPercent) / 5;

        DashboardStatsDto dto = new DashboardStatsDto();
        dto.setOverallProgress(overallPercent);
        dto.setJavaProgress(javaPercent);
        dto.setSqlProgress(sqlPercent);
        dto.setDsaProgress(dsaPercent);
        dto.setAptitudeProgress(aptitudePercent);
        dto.setInterviewProgress(interviewPercent);

        dto.setSolvedDsaCount(solvedDsa);
        dto.setCompletedTopicsCount(completedJava + completedSql);
        dto.setAptitudeTestsCount(aptitudeCount);
        dto.setMasteredInterviewCount(masteredInterview);

        // Continue Learning topic detection
        List<TopicCompletion> userTopics = topicRepo.findByUser(user);
        Set<String> completedIds = userTopics.stream().map(TopicCompletion::getTopicId).collect(Collectors.toSet());

        if (!completedIds.contains("java-basics")) {
            dto.setContinueCourse("java");
            dto.setContinueTopicId("java-basics");
            dto.setContinueTopicTitle("Java Fundamentals & Syntax");
        } else if (!completedIds.contains("oop")) {
            dto.setContinueCourse("java");
            dto.setContinueTopicId("oop");
            dto.setContinueTopicTitle("Object-Oriented Programming (OOP)");
        } else if (!completedIds.contains("select")) {
            dto.setContinueCourse("sql");
            dto.setContinueTopicId("select");
            dto.setContinueTopicTitle("SQL SELECT & Query Filtering");
        } else if (!completedIds.contains("collections")) {
            dto.setContinueCourse("java");
            dto.setContinueTopicId("collections");
            dto.setContinueTopicTitle("Java Collections Framework");
        } else if (!completedIds.contains("joins")) {
            dto.setContinueCourse("sql");
            dto.setContinueTopicId("joins");
            dto.setContinueTopicTitle("Relational Joins & Subqueries");
        } else {
            dto.setContinueCourse("dsa");
            dto.setContinueTopicId("two-sum");
            dto.setContinueTopicTitle("DSA: Two Sum Pattern");
        }

        // Today's Missions
        dto.setTodayMissions(List.of(
            "Java: Review Collections Framework & HashMap Internals",
            "DSA: Solve 'Two Sum' or 'Valid Parentheses'",
            "SQL: Practice Inner & Left Joins with GROUP BY",
            "Aptitude: Take a 5-minute Quantitative Speed Quiz",
            "Interview: Practice answering 'Why is String immutable?'"
        ));

        // Placement Recommendation
        if (solvedDsa == 0) {
            dto.setAiRecommendation("Priority: Solve your first DSA problem today. Top product companies test pattern recognition in Arrays and Hashing.");
        } else if (completedJava < 3) {
            dto.setAiRecommendation("Priority: Solidify Core Java OOP fundamentals (Inheritance, Polymorphism, and Collections) before upcoming technical rounds.");
        } else if (completedSql < 2) {
            dto.setAiRecommendation("Priority: Practice multi-table SQL queries (JOINS, GROUP BY, HAVING) — tested in 90% of backend developer interviews.");
        } else {
            dto.setAiRecommendation("Great momentum! Focus on mock interview questions and optimizing your resume project descriptions.");
        }

        return dto;
    }

    public List<RecentActivityDto> getRecentActivities(Long userId) {
        User user = authService.getEntityById(userId);
        List<RecentActivityDto> activities = new ArrayList<>();

        // Topic completions
        for (TopicCompletion tc : topicRepo.findTop10ByUserOrderByCompletedAtDesc(user)) {
            activities.add(new RecentActivityDto(
                    "TOPIC",
                    formatTopicTitle(tc.getTopicId()),
                    tc.getCourse().toUpperCase(),
                    "Completed",
                    tc.getCompletedAt()
            ));
        }

        // DSA attempts
        for (PracticeAttempt pa : practiceRepo.findTop10ByUserOrderByAttemptedAtDesc(user)) {
            activities.add(new RecentActivityDto(
                    "DSA",
                    formatProblemTitle(pa.getProblemSlug()),
                    "DSA Practice",
                    pa.getStatus(),
                    pa.getAttemptedAt()
            ));
        }

        // Aptitude attempts
        for (AptitudeAttempt aa : aptitudeRepo.findTop10ByUserOrderByCompletedAtDesc(user)) {
            activities.add(new RecentActivityDto(
                    "APTITUDE",
                    aa.getTopic() + " (" + aa.getScore() + "/" + aa.getTotalQuestions() + ")",
                    aa.getCategory(),
                    "Score: " + Math.round(((double) aa.getScore() / aa.getTotalQuestions()) * 100) + "%",
                    aa.getCompletedAt()
            ));
        }

        // Interview practices
        for (InterviewPractice ip : interviewRepo.findTop10ByUserOrderByPracticedAtDesc(user)) {
            activities.add(new RecentActivityDto(
                    "INTERVIEW",
                    "Question #" + ip.getQuestionId(),
                    ip.getCategory(),
                    Boolean.TRUE.equals(ip.getMastered()) ? "Mastered" : "Practiced",
                    ip.getPracticedAt()
            ));
        }

        // Sort descending by timestamp and limit to 10
        activities.sort(Comparator.comparing(RecentActivityDto::getTimestamp, Comparator.nullsLast(Comparator.reverseOrder())));
        return activities.stream().limit(10).collect(Collectors.toList());
    }

    private String formatTopicTitle(String slug) {
        if (slug == null) return "Topic";
        String[] parts = slug.replace("-", " ").split(" ");
        StringBuilder sb = new StringBuilder();
        for (String p : parts) {
            if (!p.isEmpty()) {
                sb.append(Character.toUpperCase(p.charAt(0))).append(p.substring(1)).append(" ");
            }
        }
        return sb.toString().trim();
    }

    private String formatProblemTitle(String slug) {
        return formatTopicTitle(slug);
    }
}
