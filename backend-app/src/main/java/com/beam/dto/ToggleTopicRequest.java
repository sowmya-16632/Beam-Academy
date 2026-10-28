package com.beam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ToggleTopicRequest {

    @NotBlank(message = "Course is required")
    private String course;

    @NotBlank(message = "Topic ID is required")
    private String topicId;

    @NotNull(message = "Completed state is required")
    private Boolean completed;

    public ToggleTopicRequest() {}

    public ToggleTopicRequest(String course, String topicId, Boolean completed) {
        this.course = course;
        this.topicId = topicId;
        this.completed = completed;
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

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
