package com.beam.service;

import com.beam.dto.PracticeAttemptRequest;
import com.beam.entity.PracticeAttempt;
import com.beam.entity.User;
import com.beam.repository.PracticeAttemptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DSAService {

    private final PracticeAttemptRepository practiceRepo;
    private final AuthService authService;

    public DSAService(PracticeAttemptRepository practiceRepo, AuthService authService) {
        this.practiceRepo = practiceRepo;
        this.authService = authService;
    }

    @Transactional
    public PracticeAttempt recordAttempt(Long userId, PracticeAttemptRequest req) {
        User user = authService.getEntityById(userId);
        PracticeAttempt attempt = new PracticeAttempt(
                user,
                req.getProblemSlug().trim(),
                req.getLanguage() != null ? req.getLanguage() : "java",
                req.getCode(),
                req.getStatus().trim().toUpperCase(),
                req.getExecutionOutput()
        );
        return practiceRepo.save(attempt);
    }

    public List<PracticeAttempt> getAttemptsForProblem(Long userId, String problemSlug) {
        User user = authService.getEntityById(userId);
        return practiceRepo.findByUserAndProblemSlugOrderByAttemptedAtDesc(user, problemSlug.trim());
    }

    public List<PracticeAttempt> getAllAttempts(Long userId) {
        User user = authService.getEntityById(userId);
        return practiceRepo.findByUserOrderByAttemptedAtDesc(user);
    }

    public List<String> getSolvedSlugs(Long userId) {
        User user = authService.getEntityById(userId);
        return practiceRepo.findByUserOrderByAttemptedAtDesc(user).stream()
                .filter(a -> "SOLVED".equalsIgnoreCase(a.getStatus()))
                .map(PracticeAttempt::getProblemSlug)
                .distinct()
                .collect(Collectors.toList());
    }
}
