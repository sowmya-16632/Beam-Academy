package com.beam.repository;

import com.beam.entity.StudyPlan;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {

    Optional<StudyPlan> findByUser(User user);
}
