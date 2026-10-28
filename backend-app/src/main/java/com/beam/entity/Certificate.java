package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates", indexes = {
    @Index(name = "idx_cert_id", columnList = "certificateId", unique = true),
    @Index(name = "idx_user_course", columnList = "userId, courseId")
})
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String courseId;

    @Column(nullable = false)
    private String courseTitle;

    @Column(unique = true, nullable = false)
    private String certificateId;

    @Column(nullable = false)
    private String recipientName;

    @Column(nullable = false)
    private String recipientEmail;

    @Column(nullable = false)
    private LocalDateTime issuedAt;

    @Column(nullable = false)
    private String status;

    private String verificationHash;

    private Integer finalScore;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String requirementsSummary;

    public Certificate() {}

    public Certificate(Long userId, String courseId, String courseTitle, String certificateId,
                       String recipientName, String recipientEmail, String status,
                       String verificationHash, Integer finalScore, String requirementsSummary) {
        this.userId = userId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.certificateId = certificateId;
        this.recipientName = recipientName;
        this.recipientEmail = recipientEmail;
        this.issuedAt = LocalDateTime.now();
        this.status = status;
        this.verificationHash = verificationHash;
        this.finalScore = finalScore;
        this.requirementsSummary = requirementsSummary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(String certificateId) {
        this.certificateId = certificateId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getVerificationHash() {
        return verificationHash;
    }

    public void setVerificationHash(String verificationHash) {
        this.verificationHash = verificationHash;
    }

    public Integer getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(Integer finalScore) {
        this.finalScore = finalScore;
    }

    public String getRequirementsSummary() {
        return requirementsSummary;
    }

    public void setRequirementsSummary(String requirementsSummary) {
        this.requirementsSummary = requirementsSummary;
    }
}
