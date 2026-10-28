package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "practice_attempts")
public class PracticeAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "problem_slug", nullable = false, length = 128)
    private String problemSlug;

    @Column(length = 32)
    private String language;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String code;

    @Column(nullable = false, length = 32)
    private String status; // "SOLVED", "ATTEMPTED"

    @Column(name = "execution_output", length = 512)
    private String executionOutput;

    @Column(nullable = false)
    private LocalDateTime attemptedAt;

    public PracticeAttempt() {}

    public PracticeAttempt(User user, String problemSlug, String language, String code, String status, String executionOutput) {
        this.user = user;
        this.problemSlug = problemSlug;
        this.language = language;
        this.code = code;
        this.status = status;
        this.executionOutput = executionOutput;
        this.attemptedAt = LocalDateTime.now();
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

    public String getProblemSlug() {
        return problemSlug;
    }

    public void setProblemSlug(String problemSlug) {
        this.problemSlug = problemSlug;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getExecutionOutput() {
        return executionOutput;
    }

    public void setExecutionOutput(String executionOutput) {
        this.executionOutput = executionOutput;
    }

    public LocalDateTime getAttemptedAt() {
        return attemptedAt;
    }

    public void setAttemptedAt(LocalDateTime attemptedAt) {
        this.attemptedAt = attemptedAt;
    }
}
