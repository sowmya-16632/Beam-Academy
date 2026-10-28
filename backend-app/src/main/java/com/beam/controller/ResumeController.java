package com.beam.controller;

import com.beam.dto.ResumeProfileDto;
import com.beam.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ResumeProfileDto> getResume(@PathVariable Long userId) {
        return ResponseEntity.ok(resumeService.getResume(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ResumeProfileDto> saveResume(@PathVariable Long userId, @RequestBody ResumeProfileDto dto) {
        return ResponseEntity.ok(resumeService.saveResume(userId, dto));
    }
}
