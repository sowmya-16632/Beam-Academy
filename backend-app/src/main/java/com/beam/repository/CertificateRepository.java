package com.beam.repository;

import com.beam.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Optional<Certificate> findByCertificateId(String certificateId);
    Optional<Certificate> findByUserIdAndCourseId(Long userId, String courseId);
    List<Certificate> findByUserId(Long userId);
}
