package com.beam.controller;

import com.beam.dto.AICoachRequest;
import com.beam.dto.AICoachResponse;
import com.beam.service.AICoachService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AICoachController {

    private final AICoachService aiCoachService;

    public AICoachController(AICoachService aiCoachService) {
        this.aiCoachService = aiCoachService;
    }

    @PostMapping("/coach")
    public ResponseEntity<AICoachResponse> coach(
            @Valid @RequestBody AICoachRequest request,
            @RequestParam(required = false) Long userId) {
        AICoachResponse response = aiCoachService.coach(userId, request);
        return ResponseEntity.ok(response);
    }
}
