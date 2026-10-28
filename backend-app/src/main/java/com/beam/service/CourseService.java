package com.beam.service;

import com.beam.dto.ToggleTopicRequest;
import com.beam.entity.TopicCompletion;
import com.beam.entity.User;
import com.beam.repository.TopicCompletionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final TopicCompletionRepository topicRepo;
    private final AuthService authService;

    public CourseService(TopicCompletionRepository topicRepo, AuthService authService) {
        this.topicRepo = topicRepo;
        this.authService = authService;
    }

    public List<String> getCompletedTopicIds(Long userId, String course) {
        User user = authService.getEntityById(userId);
        return topicRepo.findByUserAndCourse(user, course.toLowerCase().trim())
                .stream()
                .map(TopicCompletion::getTopicId)
                .collect(Collectors.toList());
    }

    public Map<String, List<String>> getAllCompletions(Long userId) {
        User user = authService.getEntityById(userId);
        List<TopicCompletion> completions = topicRepo.findByUser(user);

        Map<String, List<String>> map = new HashMap<>();
        for (TopicCompletion tc : completions) {
            map.computeIfAbsent(tc.getCourse(), k -> new java.util.ArrayList<>())
               .add(tc.getTopicId());
        }
        return map;
    }

    @Transactional
    public void toggleTopic(Long userId, ToggleTopicRequest request) {
        User user = authService.getEntityById(userId);
        String course = request.getCourse().toLowerCase().trim();
        String topicId = request.getTopicId().trim();

        if (Boolean.TRUE.equals(request.getCompleted())) {
            if (topicRepo.findByUserAndCourseAndTopicId(user, course, topicId).isEmpty()) {
                topicRepo.save(new TopicCompletion(user, course, topicId));
            }
        } else {
            topicRepo.deleteByUserAndCourseAndTopicId(user, course, topicId);
        }
    }
}
