package com.beam.dto;

import jakarta.validation.constraints.NotBlank;

public class AICoachRequest {

    @NotBlank(message = "Prompt is required")
    private String prompt;

    private String courseContext;

    private String problemContext;

    private String currentCode;

    private String targetRole;

    public AICoachRequest() {}

    public AICoachRequest(String prompt, String courseContext, String problemContext, String currentCode, String targetRole) {
        this.prompt = prompt;
        this.courseContext = courseContext;
        this.problemContext = problemContext;
        this.currentCode = currentCode;
        this.targetRole = targetRole;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getCourseContext() {
        return courseContext;
    }

    public void setCourseContext(String courseContext) {
        this.courseContext = courseContext;
    }

    public String getProblemContext() {
        return problemContext;
    }

    public void setProblemContext(String problemContext) {
        this.problemContext = problemContext;
    }

    public String getCurrentCode() {
        return currentCode;
    }

    public void setCurrentCode(String currentCode) {
        this.currentCode = currentCode;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }
}
