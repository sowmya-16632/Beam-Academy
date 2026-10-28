package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_plans")
public class StudyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "target_role", nullable = false, length = 128)
    private String targetRole;

    @Column(name = "skill_level", nullable = false, length = 64)
    private String skillLevel;

    @Column(name = "hours_per_day", nullable = false)
    private Integer hoursPerDay;

    @Column(name = "duration_weeks", nullable = false)
    private Integer durationWeeks;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String planJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String completedTaskKeysJson;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public StudyPlan() {}

    public StudyPlan(User user, String targetRole, String skillLevel, Integer hoursPerDay, Integer durationWeeks, String planJson, String completedTaskKeysJson) {
        this.user = user;
        this.targetRole = targetRole;
        this.skillLevel = skillLevel;
        this.hoursPerDay = hoursPerDay;
        this.durationWeeks = durationWeeks;
        this.planJson = planJson;
        this.completedTaskKeysJson = completedTaskKeysJson != null ? completedTaskKeysJson : "[]";
        this.updatedAt = LocalDateTime.now();
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Integer getDurationWeeks() {
        return durationWeeks;
    }

    public void setDurationWeeks(Integer durationWeeks) {
        this.durationWeeks = durationWeeks;
    }

    public String getPlanJson() {
        return planJson;
    }

    public void setPlanJson(String planJson) {
        this.planJson = planJson;
    }

    public String getCompletedTaskKeysJson() {
        return completedTaskKeysJson;
    }

    public void setCompletedTaskKeysJson(String completedTaskKeysJson) {
        this.completedTaskKeysJson = completedTaskKeysJson;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
