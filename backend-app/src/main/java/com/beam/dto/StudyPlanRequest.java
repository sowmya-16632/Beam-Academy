package com.beam.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StudyPlanRequest {

    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotBlank(message = "Current skill level is required")
    private String skillLevel;

    @NotNull(message = "Hours per day is required")
    @Min(value = 1, message = "Hours per day must be at least 1")
    private Integer hoursPerDay;

    @NotNull(message = "Duration in weeks is required")
    @Min(value = 1, message = "Duration must be at least 1 week")
    private Integer durationWeeks;

    private String planJson;

    private String completedTaskKeysJson;

    public StudyPlanRequest() {}

    public StudyPlanRequest(String targetRole, String skillLevel, Integer hoursPerDay, Integer durationWeeks, String planJson, String completedTaskKeysJson) {
        this.targetRole = targetRole;
        this.skillLevel = skillLevel;
        this.hoursPerDay = hoursPerDay;
        this.durationWeeks = durationWeeks;
        this.planJson = planJson;
        this.completedTaskKeysJson = completedTaskKeysJson;
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
}
