package com.beam.controller;

import com.beam.dto.DashboardStatsDto;
import com.beam.dto.RecentActivityDto;
import com.beam.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ProgressService progressService;

    public DashboardController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<DashboardStatsDto> getStats(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getDashboardStats(userId));
    }

    @GetMapping("/recent-activity/{userId}")
    public ResponseEntity<List<RecentActivityDto>> getRecentActivity(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getRecentActivities(userId));
    }
}
