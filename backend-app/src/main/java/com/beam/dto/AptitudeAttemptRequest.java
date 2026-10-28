package com.beam.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AptitudeAttemptRequest {

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score cannot be negative")
    private Integer score;

    @NotNull(message = "Total questions is required")
    @Min(value = 1, message = "Total questions must be at least 1")
    private Integer totalQuestions;

    private Integer timeSpentSeconds;

    public AptitudeAttemptRequest() {}

    public AptitudeAttemptRequest(String category, String topic, Integer score, Integer totalQuestions, Integer timeSpentSeconds) {
        this.category = category;
        this.topic = topic;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.timeSpentSeconds = timeSpentSeconds;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getTimeSpentSeconds() {
        return timeSpentSeconds;
    }

    public void setTimeSpentSeconds(Integer timeSpentSeconds) {
        this.timeSpentSeconds = timeSpentSeconds;
    }
}
