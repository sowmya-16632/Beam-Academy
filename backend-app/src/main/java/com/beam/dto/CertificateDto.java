package com.beam.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class CertificateDto {

    private Long id;
    private Long userId;
    private String courseId;
    private String courseTitle;
    private String certificateId;
    private String recipientName;
    private String recipientEmail;
    private LocalDateTime issuedAt;
    private String status;
    private String verificationHash;
    private Integer finalScore;
    private String requirementsSummary;
    private boolean eligible;
    private List<String> satisfiedCriteria;
    private List<String> pendingCriteria;
    private String verificationUrl;

    public CertificateDto() {}

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

    public boolean isEligible() {
        return eligible;
    }

    public void setEligible(boolean eligible) {
        this.eligible = eligible;
    }

    public List<String> getSatisfiedCriteria() {
        return satisfiedCriteria;
    }

    public void setSatisfiedCriteria(List<String> satisfiedCriteria) {
        this.satisfiedCriteria = satisfiedCriteria;
    }

    public List<String> getPendingCriteria() {
        return pendingCriteria;
    }

    public void setPendingCriteria(List<String> pendingCriteria) {
        this.pendingCriteria = pendingCriteria;
    }

    public String getVerificationUrl() {
        return verificationUrl;
    }

    public void setVerificationUrl(String verificationUrl) {
        this.verificationUrl = verificationUrl;
    }
}
