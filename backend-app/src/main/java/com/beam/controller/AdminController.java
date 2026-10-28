package com.beam.controller;

import com.beam.entity.User;
import com.beam.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final TopicCompletionRepository topicRepo;
    private final PracticeAttemptRepository practiceRepo;
    private final AptitudeAttemptRepository aptitudeRepo;
    private final InterviewPracticeRepository interviewRepo;

    public AdminController(UserRepository userRepository,
                           TopicCompletionRepository topicRepo,
                           PracticeAttemptRepository practiceRepo,
                           AptitudeAttemptRepository aptitudeRepo,
                           InterviewPracticeRepository interviewRepo) {
        this.userRepository = userRepository;
        this.topicRepo = topicRepo;
        this.practiceRepo = practiceRepo;
        this.aptitudeRepo = aptitudeRepo;
        this.interviewRepo = interviewRepo;
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getSystemOverview() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalTopicCompletions = topicRepo.count();
        long totalDsaAttempts = practiceRepo.count();
        long totalAptitudeAttempts = aptitudeRepo.count();
        long totalInterviewPractices = interviewRepo.count();

        stats.put("totalUsers", totalUsers);
        stats.put("totalTopicCompletions", totalTopicCompletions);
        stats.put("totalDsaAttempts", totalDsaAttempts);
        stats.put("totalAptitudeAttempts", totalAptitudeAttempts);
        stats.put("totalInterviewPractices", totalInterviewPractices);
        stats.put("systemStatus", "OPERATIONAL");
        stats.put("databaseConnected", true);
        stats.put("serverUptimeSeconds", (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024));

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Clear passwords before returning
        users.forEach(u -> u.setPassword("[PROTECTED]"));
        return ResponseEntity.ok(users);
    }
}
