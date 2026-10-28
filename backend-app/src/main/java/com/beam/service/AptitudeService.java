package com.beam.service;

import com.beam.dto.AptitudeAttemptRequest;
import com.beam.entity.AptitudeAttempt;
import com.beam.entity.User;
import com.beam.repository.AptitudeAttemptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AptitudeService {

    private final AptitudeAttemptRepository aptitudeRepo;
    private final AuthService authService;

    public AptitudeService(AptitudeAttemptRepository aptitudeRepo, AuthService authService) {
        this.aptitudeRepo = aptitudeRepo;
        this.authService = authService;
    }

    @Transactional
    public AptitudeAttempt recordAttempt(Long userId, AptitudeAttemptRequest req) {
        User user = authService.getEntityById(userId);
        AptitudeAttempt attempt = new AptitudeAttempt(
                user,
                req.getCategory().trim(),
                req.getTopic().trim(),
                req.getScore(),
                req.getTotalQuestions(),
                req.getTimeSpentSeconds()
        );
        return aptitudeRepo.save(attempt);
    }

    public List<AptitudeAttempt> getAllAttempts(Long userId) {
        User user = authService.getEntityById(userId);
        return aptitudeRepo.findByUserOrderByCompletedAtDesc(user);
    }

    public List<AptitudeAttempt> getCategoryAttempts(Long userId, String category) {
        User user = authService.getEntityById(userId);
        return aptitudeRepo.findByUserAndCategoryOrderByCompletedAtDesc(user, category.trim());
    }
}
