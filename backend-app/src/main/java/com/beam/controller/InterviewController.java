package com.beam.controller;

import com.beam.dto.InterviewPracticeRequest;
import com.beam.entity.InterviewPractice;
import com.beam.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/practice/{userId}")
    public ResponseEntity<Map<String, Object>> recordPractice(@PathVariable Long userId, @Valid @RequestBody InterviewPracticeRequest req) {
        InterviewPractice practice = interviewService.recordPractice(userId, req);
        return ResponseEntity.ok(Map.of(
                "message", "Interview practice saved successfully",
                "questionId", practice.getQuestionId(),
                "mastered", practice.getMastered()
        ));
    }

    @GetMapping("/practices/{userId}")
    public ResponseEntity<List<InterviewPractice>> getAllPractices(@PathVariable Long userId) {
        return ResponseEntity.ok(interviewService.getAllPractices(userId));
    }

    @GetMapping("/mastered/{userId}")
    public ResponseEntity<List<String>> getMasteredQuestionIds(@PathVariable Long userId) {
        return ResponseEntity.ok(interviewService.getMasteredQuestionIds(userId));
    }
}
