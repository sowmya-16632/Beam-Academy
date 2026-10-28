package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String targetRole;

    private String skillLevel;

    private Integer hoursPerDay;

    @Column(nullable = false)
    private String role;

    private String targetCompany;

    private String targetPlacementDate;

    private String weakAreas;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String assessmentJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String jobApplicationsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String revisionQueueJson;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.role == null) {
            this.role = "LEARNER";
        }
        if (this.targetRole == null) {
            this.targetRole = "Java Backend Developer";
        }
        if (this.skillLevel == null) {
            this.skillLevel = "Beginner";
        }
        if (this.hoursPerDay == null) {
            this.hoursPerDay = 3;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    public Integer getHoursPerDay() {
        return hoursPerDay;
    }

    public void setHoursPerDay(Integer hoursPerDay) {
        this.hoursPerDay = hoursPerDay;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTargetCompany() {
        return targetCompany;
    }

    public void setTargetCompany(String targetCompany) {
        this.targetCompany = targetCompany;
    }

    public String getTargetPlacementDate() {
        return targetPlacementDate;
    }

    public void setTargetPlacementDate(String targetPlacementDate) {
        this.targetPlacementDate = targetPlacementDate;
    }

    public String getWeakAreas() {
        return weakAreas;
    }

    public void setWeakAreas(String weakAreas) {
        this.weakAreas = weakAreas;
    }

    public String getAssessmentJson() {
        return assessmentJson;
    }

    public void setAssessmentJson(String assessmentJson) {
        this.assessmentJson = assessmentJson;
    }

    public String getJobApplicationsJson() {
        return jobApplicationsJson;
    }

    public void setJobApplicationsJson(String jobApplicationsJson) {
        this.jobApplicationsJson = jobApplicationsJson;
    }

    public String getRevisionQueueJson() {
        return revisionQueueJson;
    }

    public void setRevisionQueueJson(String revisionQueueJson) {
        this.revisionQueueJson = revisionQueueJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}