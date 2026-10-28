package com.beam.controller;

import com.beam.dto.DashboardStatsDto;
import com.beam.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<DashboardStatsDto> getProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getDashboardStats(userId));
    }
}
