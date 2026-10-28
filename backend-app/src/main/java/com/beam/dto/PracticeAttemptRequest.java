package com.beam.dto;

import jakarta.validation.constraints.NotBlank;

public class PracticeAttemptRequest {

    @NotBlank(message = "Problem slug is required")
    private String problemSlug;

    private String language;

    private String code;

    @NotBlank(message = "Status is required (e.g. SOLVED or ATTEMPTED)")
    private String status;

    private String executionOutput;

    public PracticeAttemptRequest() {}

    public PracticeAttemptRequest(String problemSlug, String language, String code, String status, String executionOutput) {
        this.problemSlug = problemSlug;
        this.language = language;
        this.code = code;
        this.status = status;
        this.executionOutput = executionOutput;
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
}
