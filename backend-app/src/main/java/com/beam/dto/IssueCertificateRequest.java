package com.beam.dto;

public class IssueCertificateRequest {
    private String courseId;
    private String courseTitle;

    public IssueCertificateRequest() {}

    public IssueCertificateRequest(String courseId, String courseTitle) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }
}
