package com.beam.repository;

import com.beam.entity.AptitudeAttempt;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AptitudeAttemptRepository extends JpaRepository<AptitudeAttempt, Long> {

    List<AptitudeAttempt> findByUserOrderByCompletedAtDesc(User user);

    List<AptitudeAttempt> findByUserAndCategoryOrderByCompletedAtDesc(User user, String category);

    long countByUser(User user);

    List<AptitudeAttempt> findTop10ByUserOrderByCompletedAtDesc(User user);
}
