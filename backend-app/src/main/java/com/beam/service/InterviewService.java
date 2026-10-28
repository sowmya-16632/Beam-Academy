package com.beam.service;

import com.beam.dto.InterviewPracticeRequest;
import com.beam.entity.InterviewPractice;
import com.beam.entity.User;
import com.beam.repository.InterviewPracticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    private final InterviewPracticeRepository interviewRepo;
    private final AuthService authService;

    public InterviewService(InterviewPracticeRepository interviewRepo, AuthService authService) {
        this.interviewRepo = interviewRepo;
        this.authService = authService;
    }

    @Transactional
    public InterviewPractice recordPractice(Long userId, InterviewPracticeRequest req) {
        User user = authService.getEntityById(userId);
        String questionId = req.getQuestionId().trim();

        InterviewPractice practice = interviewRepo.findByUserAndQuestionId(user, questionId)
                .orElse(new InterviewPractice(user, questionId, req.getCategory().trim(), req.getMastered(), req.getUserNotes()));

        practice.setCategory(req.getCategory().trim());
        practice.setMastered(req.getMastered());
        if (req.getUserNotes() != null) {
            practice.setUserNotes(req.getUserNotes());
        }
        practice.setPracticedAt(LocalDateTime.now());

        return interviewRepo.save(practice);
    }

    public List<InterviewPractice> getAllPractices(Long userId) {
        User user = authService.getEntityById(userId);
        return interviewRepo.findByUser(user);
    }

    public List<String> getMasteredQuestionIds(Long userId) {
        User user = authService.getEntityById(userId);
        return interviewRepo.findByUser(user).stream()
                .filter(p -> Boolean.TRUE.equals(p.getMastered()))
                .map(InterviewPractice::getQuestionId)
                .collect(Collectors.toList());
    }
}
