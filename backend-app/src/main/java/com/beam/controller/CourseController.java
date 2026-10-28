package com.beam.controller;

import com.beam.dto.ToggleTopicRequest;
import com.beam.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/completions/{userId}")
    public ResponseEntity<Map<String, List<String>>> getAllCompletions(@PathVariable Long userId) {
        return ResponseEntity.ok(courseService.getAllCompletions(userId));
    }

    @GetMapping("/{course}/completions/{userId}")
    public ResponseEntity<List<String>> getCourseCompletions(@PathVariable String course, @PathVariable Long userId) {
        return ResponseEntity.ok(courseService.getCompletedTopicIds(userId, course));
    }

    @PostMapping("/toggle/{userId}")
    public ResponseEntity<Map<String, String>> toggleTopic(@PathVariable Long userId, @Valid @RequestBody ToggleTopicRequest request) {
        courseService.toggleTopic(userId, request);
        return ResponseEntity.ok(Map.of("message", "Topic status updated successfully"));
    }
}
