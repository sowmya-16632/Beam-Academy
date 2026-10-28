package com.beam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "topic_completions",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course", "topic_id"})
)
public class TopicCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 64)
    private String course; // e.g. "java", "sql", "dsa", "aptitude", "interview"

    @Column(name = "topic_id", nullable = false, length = 128)
    private String topicId;

    @Column(nullable = false)
    private LocalDateTime completedAt;

    public TopicCompletion() {}

    public TopicCompletion(User user, String course, String topicId) {
        this.user = user;
        this.course = course;
        this.topicId = topicId;
        this.completedAt = LocalDateTime.now();
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

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
