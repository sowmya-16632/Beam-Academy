package com.beam.dto;

import java.util.List;

public class DashboardStatsDto {

    private int overallProgress;
    private int javaProgress;
    private int sqlProgress;
    private int dsaProgress;
    private int aptitudeProgress;
    private int interviewProgress;

    private long solvedDsaCount;
    private long completedTopicsCount;
    private long aptitudeTestsCount;
    private long masteredInterviewCount;

    private String continueCourse;
    private String continueTopicId;
    private String continueTopicTitle;

    private List<String> todayMissions;
    private String aiRecommendation;

    public DashboardStatsDto() {}

    public int getOverallProgress() {
        return overallProgress;
    }

    public void setOverallProgress(int overallProgress) {
        this.overallProgress = overallProgress;
    }

    public int getJavaProgress() {
        return javaProgress;
    }

    public void setJavaProgress(int javaProgress) {
        this.javaProgress = javaProgress;
    }

    public int getSqlProgress() {
        return sqlProgress;
    }

    public void setSqlProgress(int sqlProgress) {
        this.sqlProgress = sqlProgress;
    }

    public int getDsaProgress() {
        return dsaProgress;
    }

    public void setDsaProgress(int dsaProgress) {
        this.dsaProgress = dsaProgress;
    }

    public int getAptitudeProgress() {
        return aptitudeProgress;
    }

    public void setAptitudeProgress(int aptitudeProgress) {
        this.aptitudeProgress = aptitudeProgress;
    }

    public int getInterviewProgress() {
        return interviewProgress;
    }

    public void setInterviewProgress(int interviewProgress) {
        this.interviewProgress = interviewProgress;
    }

    public long getSolvedDsaCount() {
        return solvedDsaCount;
    }

    public void setSolvedDsaCount(long solvedDsaCount) {
        this.solvedDsaCount = solvedDsaCount;
    }

    public long getCompletedTopicsCount() {
        return completedTopicsCount;
    }

    public void setCompletedTopicsCount(long completedTopicsCount) {
        this.completedTopicsCount = completedTopicsCount;
    }

    public long getAptitudeTestsCount() {
        return aptitudeTestsCount;
    }

    public void setAptitudeTestsCount(long aptitudeTestsCount) {
        this.aptitudeTestsCount = aptitudeTestsCount;
    }

    public long getMasteredInterviewCount() {
        return masteredInterviewCount;
    }

    public void setMasteredInterviewCount(long masteredInterviewCount) {
        this.masteredInterviewCount = masteredInterviewCount;
    }

    public String getContinueCourse() {
        return continueCourse;
    }

    public void setContinueCourse(String continueCourse) {
        this.continueCourse = continueCourse;
    }

    public String getContinueTopicId() {
        return continueTopicId;
    }

    public void setContinueTopicId(String continueTopicId) {
        this.continueTopicId = continueTopicId;
    }

    public String getContinueTopicTitle() {
        return continueTopicTitle;
    }

    public void setContinueTopicTitle(String continueTopicTitle) {
        this.continueTopicTitle = continueTopicTitle;
    }

    public List<String> getTodayMissions() {
        return todayMissions;
    }

    public void setTodayMissions(List<String> todayMissions) {
        this.todayMissions = todayMissions;
    }

    public String getAiRecommendation() {
        return aiRecommendation;
    }

    public void setAiRecommendation(String aiRecommendation) {
        this.aiRecommendation = aiRecommendation;
    }
}
