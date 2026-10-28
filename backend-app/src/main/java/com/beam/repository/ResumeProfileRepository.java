package com.beam.repository;

import com.beam.entity.ResumeProfile;
import com.beam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeProfileRepository extends JpaRepository<ResumeProfile, Long> {

    Optional<ResumeProfile> findByUser(User user);
}
