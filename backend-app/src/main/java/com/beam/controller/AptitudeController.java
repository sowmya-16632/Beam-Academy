package com.beam.controller;

import com.beam.dto.AptitudeAttemptRequest;
import com.beam.entity.AptitudeAttempt;
import com.beam.service.AptitudeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/aptitude")
public class AptitudeController {

    private final AptitudeService aptitudeService;

    public AptitudeController(AptitudeService aptitudeService) {
        this.aptitudeService = aptitudeService;
    }

    @PostMapping("/attempt/{userId}")
    public ResponseEntity<Map<String, Object>> submitAttempt(@PathVariable Long userId, @Valid @RequestBody AptitudeAttemptRequest req) {
        AptitudeAttempt attempt = aptitudeService.recordAttempt(userId, req);
        return ResponseEntity.ok(Map.of(
                "message", "Aptitude quiz attempt saved successfully",
                "attemptId", attempt.getId(),
                "score", attempt.getScore(),
                "totalQuestions", attempt.getTotalQuestions()
        ));
    }

    @GetMapping("/attempts/{userId}")
    public ResponseEntity<List<AptitudeAttempt>> getAllAttempts(@PathVariable Long userId) {
        return ResponseEntity.ok(aptitudeService.getAllAttempts(userId));
    }

    @GetMapping("/attempts/{userId}/category/{category}")
    public ResponseEntity<List<AptitudeAttempt>> getCategoryAttempts(@PathVariable Long userId, @PathVariable String category) {
        return ResponseEntity.ok(aptitudeService.getCategoryAttempts(userId, category));
    }
}
