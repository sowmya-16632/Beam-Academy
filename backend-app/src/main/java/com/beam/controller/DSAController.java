package com.beam.controller;

import com.beam.dto.PracticeAttemptRequest;
import com.beam.entity.PracticeAttempt;
import com.beam.service.DSAService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dsa")
public class DSAController {

    private final DSAService dsaService;

    public DSAController(DSAService dsaService) {
        this.dsaService = dsaService;
    }

    @PostMapping("/attempt/{userId}")
    public ResponseEntity<Map<String, Object>> submitAttempt(@PathVariable Long userId, @Valid @RequestBody PracticeAttemptRequest req) {
        PracticeAttempt attempt = dsaService.recordAttempt(userId, req);
        return ResponseEntity.ok(Map.of(
                "message", "Attempt recorded successfully",
                "attemptId", attempt.getId(),
                "status", attempt.getStatus()
        ));
    }

    @GetMapping("/attempts/{userId}")
    public ResponseEntity<List<PracticeAttempt>> getAllAttempts(@PathVariable Long userId) {
        return ResponseEntity.ok(dsaService.getAllAttempts(userId));
    }

    @GetMapping("/problem/{slug}/attempts/{userId}")
    public ResponseEntity<List<PracticeAttempt>> getProblemAttempts(@PathVariable String slug, @PathVariable Long userId) {
        return ResponseEntity.ok(dsaService.getAttemptsForProblem(userId, slug));
    }

    @GetMapping("/solved/{userId}")
    public ResponseEntity<List<String>> getSolvedSlugs(@PathVariable Long userId) {
        return ResponseEntity.ok(dsaService.getSolvedSlugs(userId));
    }
}
