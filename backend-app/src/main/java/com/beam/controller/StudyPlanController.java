package com.beam.controller;

import com.beam.dto.StudyPlanRequest;
import com.beam.entity.StudyPlan;
import com.beam.service.StudyPlanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/study-plan")
public class StudyPlanController {

    private final StudyPlanService planService;

    public StudyPlanController(StudyPlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudyPlan> getPlan(@PathVariable Long userId) {
        return ResponseEntity.ok(planService.getPlan(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<StudyPlan> savePlan(@PathVariable Long userId, @Valid @RequestBody StudyPlanRequest req) {
        return ResponseEntity.ok(planService.savePlan(userId, req));
    }

    @PostMapping("/{userId}/tasks")
    public ResponseEntity<StudyPlan> updateTasks(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        String keysJson = body.getOrDefault("completedTaskKeysJson", "[]");
        return ResponseEntity.ok(planService.updateCompletedTasks(userId, keysJson));
    }
}
