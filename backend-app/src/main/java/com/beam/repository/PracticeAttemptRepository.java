package com.beam.repository;

import com.beam.entity.PracticeAttempt;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PracticeAttemptRepository extends JpaRepository<PracticeAttempt, Long> {

    List<PracticeAttempt> findByUserOrderByAttemptedAtDesc(User user);

    List<PracticeAttempt> findByUserAndProblemSlugOrderByAttemptedAtDesc(User user, String problemSlug);

    long countByUserAndStatus(User user, String status);

    List<PracticeAttempt> findTop10ByUserOrderByAttemptedAtDesc(User user);

    boolean existsByUserAndProblemSlugAndStatus(User user, String problemSlug, String status);
}
