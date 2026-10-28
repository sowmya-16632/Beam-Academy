package com.beam.dto;

import com.beam.entity.ResumeProfile;

public class ResumeProfileDto {

    private String fullName;
    private String headline;
    private String contactEmail;
    private String phone;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String educationJson;
    private String skillsJson;
    private String projectsJson;
    private String internshipsJson;
    private String certificationsJson;
    private String achievementsJson;

    public ResumeProfileDto() {}

    public ResumeProfileDto(ResumeProfile entity) {
        if (entity != null) {
            this.fullName = entity.getFullName();
            this.headline = entity.getHeadline();
            this.contactEmail = entity.getContactEmail();
            this.phone = entity.getPhone();
            this.location = entity.getLocation();
            this.githubUrl = entity.getGithubUrl();
            this.linkedinUrl = entity.getLinkedinUrl();
            this.educationJson = entity.getEducationJson();
            this.skillsJson = entity.getSkillsJson();
            this.projectsJson = entity.getProjectsJson();
            this.internshipsJson = entity.getInternshipsJson();
            this.certificationsJson = entity.getCertificationsJson();
            this.achievementsJson = entity.getAchievementsJson();
        }
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getEducationJson() {
        return educationJson;
    }

    public void setEducationJson(String educationJson) {
        this.educationJson = educationJson;
    }

    public String getSkillsJson() {
        return skillsJson;
    }

    public void setSkillsJson(String skillsJson) {
        this.skillsJson = skillsJson;
    }

    public String getProjectsJson() {
        return projectsJson;
    }

    public void setProjectsJson(String projectsJson) {
        this.projectsJson = projectsJson;
    }

    public String getInternshipsJson() {
        return internshipsJson;
    }

    public void setInternshipsJson(String internshipsJson) {
        this.internshipsJson = internshipsJson;
    }

    public String getCertificationsJson() {
        return certificationsJson;
    }

    public void setCertificationsJson(String certificationsJson) {
        this.certificationsJson = certificationsJson;
    }

    public String getAchievementsJson() {
        return achievementsJson;
    }

    public void setAchievementsJson(String achievementsJson) {
        this.achievementsJson = achievementsJson;
    }
}
