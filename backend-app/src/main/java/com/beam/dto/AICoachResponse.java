package com.beam.dto;

public class AICoachResponse {

    private String answer;
    private String status; // "ONLINE", "FALLBACK"
    private String model;

    public AICoachResponse() {}

    public AICoachResponse(String answer, String status, String model) {
        this.answer = answer;
        this.status = status;
        this.model = model;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
