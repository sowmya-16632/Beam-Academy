package com.beam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class InterviewPracticeRequest {

    @NotBlank(message = "Question ID is required")
    private String questionId;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Mastered status is required")
    private Boolean mastered;

    private String userNotes;

    public InterviewPracticeRequest() {}

    public InterviewPracticeRequest(String questionId, String category, Boolean mastered, String userNotes) {
        this.questionId = questionId;
        this.category = category;
        this.mastered = mastered;
        this.userNotes = userNotes;
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
}
