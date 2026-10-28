package com.beam.dto;

import com.beam.entity.User;

public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String targetRole;
    private String skillLevel;
    private Integer hoursPerDay;
    private String role;
    private String targetCompany;
    private String targetPlacementDate;
    private String weakAreas;
    private String assessmentJson;
    private String jobApplicationsJson;
    private String revisionQueueJson;

    public UserDto() {}

    public UserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.targetRole = user.getTargetRole();
        this.skillLevel = user.getSkillLevel();
        this.hoursPerDay = user.getHoursPerDay();
        this.role = user.getRole();
        this.targetCompany = user.getTargetCompany();
        this.targetPlacementDate = user.getTargetPlacementDate();
        this.weakAreas = user.getWeakAreas();
        this.assessmentJson = user.getAssessmentJson();
        this.jobApplicationsJson = user.getJobApplicationsJson();
        this.revisionQueueJson = user.getRevisionQueueJson();
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
}
