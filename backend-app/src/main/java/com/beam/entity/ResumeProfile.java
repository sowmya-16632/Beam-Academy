package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_profiles")
public class ResumeProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String fullName;

    private String headline;

    private String contactEmail;

    private String phone;

    private String location;

    private String githubUrl;

    private String linkedinUrl;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String educationJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String skillsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String projectsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String internshipsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String certificationsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String achievementsJson;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public ResumeProfile() {}

    public ResumeProfile(User user) {
        this.user = user;
        this.fullName = user.getName();
        this.contactEmail = user.getEmail();
        this.headline = "Aspiring Java Backend Developer | Software Engineer";
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
