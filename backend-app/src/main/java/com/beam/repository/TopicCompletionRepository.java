package com.beam.repository;

import com.beam.entity.TopicCompletion;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TopicCompletionRepository extends JpaRepository<TopicCompletion, Long> {

    List<TopicCompletion> findByUser(User user);

    List<TopicCompletion> findByUserAndCourse(User user, String course);

    Optional<TopicCompletion> findByUserAndCourseAndTopicId(User user, String course, String topicId);

    long countByUser(User user);

    long countByUserAndCourse(User user, String course);

    List<TopicCompletion> findTop10ByUserOrderByCompletedAtDesc(User user);

    @Transactional
    void deleteByUserAndCourseAndTopicId(User user, String course, String topicId);
}
