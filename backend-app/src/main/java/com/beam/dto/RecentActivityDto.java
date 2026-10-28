package com.beam.dto;

import java.time.LocalDateTime;

public class RecentActivityDto {

    private String type; // "TOPIC", "DSA", "APTITUDE", "INTERVIEW"
    private String title;
    private String category;
    private String status;
    private LocalDateTime timestamp;

    public RecentActivityDto() {}

    public RecentActivityDto(String type, String title, String category, String status, LocalDateTime timestamp) {
        this.type = type;
        this.title = title;
        this.category = category;
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
