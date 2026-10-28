package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "interview_practices",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "question_id"})
)
public class InterviewPractice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "question_id", nullable = false, length = 128)
    private String questionId;

    @Column(nullable = false, length = 64)
    private String category;

    @Column(nullable = false)
    private Boolean mastered = false;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String userNotes;

    @Column(nullable = false)
    private LocalDateTime practicedAt;

    public InterviewPractice() {}

    public InterviewPractice(User user, String questionId, String category, Boolean mastered, String userNotes) {
        this.user = user;
        this.questionId = questionId;
        this.category = category;
        this.mastered = mastered;
        this.userNotes = userNotes;
        this.practicedAt = LocalDateTime.now();
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

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getMastered() {
        return mastered;
    }

    public void setMastered(Boolean mastered) {
        this.mastered = mastered;
    }

    public String getUserNotes() {
        return userNotes;
    }

    public void setUserNotes(String userNotes) {
        this.userNotes = userNotes;
    }

    public LocalDateTime getPracticedAt() {
        return practicedAt;
    }

    public void setPracticedAt(LocalDateTime practicedAt) {
        this.practicedAt = practicedAt;
    }
}
