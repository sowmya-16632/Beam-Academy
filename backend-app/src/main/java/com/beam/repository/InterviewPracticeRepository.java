package com.beam.repository;

import com.beam.entity.InterviewPractice;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewPracticeRepository extends JpaRepository<InterviewPractice, Long> {

    List<InterviewPractice> findByUser(User user);

    List<InterviewPractice> findByUserAndCategory(User user, String category);

    Optional<InterviewPractice> findByUserAndQuestionId(User user, String questionId);

    long countByUser(User user);

    long countByUserAndMastered(User user, Boolean mastered);

    List<InterviewPractice> findTop10ByUserOrderByPracticedAtDesc(User user);
}
