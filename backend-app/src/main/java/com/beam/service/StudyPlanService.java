package com.beam.service;

import com.beam.dto.StudyPlanRequest;
import com.beam.entity.StudyPlan;
import com.beam.entity.User;
import com.beam.repository.StudyPlanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class StudyPlanService {

    private final StudyPlanRepository planRepo;
    private final AuthService authService;

    public StudyPlanService(StudyPlanRepository planRepo, AuthService authService) {
        this.planRepo = planRepo;
        this.authService = authService;
    }

    public StudyPlan getPlan(Long userId) {
        User user = authService.getEntityById(userId);
        return planRepo.findByUser(user).orElseGet(() -> createDefaultPlan(user));
    }

    @Transactional
    public StudyPlan savePlan(Long userId, StudyPlanRequest req) {
        User user = authService.getEntityById(userId);
        StudyPlan plan = planRepo.findByUser(user).orElse(new StudyPlan());
        plan.setUser(user);
        plan.setTargetRole(req.getTargetRole());
        plan.setSkillLevel(req.getSkillLevel());
        plan.setHoursPerDay(req.getHoursPerDay());
        plan.setDurationWeeks(req.getDurationWeeks());
        if (req.getPlanJson() != null) {
            plan.setPlanJson(req.getPlanJson());
        }
        if (req.getCompletedTaskKeysJson() != null) {
            plan.setCompletedTaskKeysJson(req.getCompletedTaskKeysJson());
        }
        plan.setUpdatedAt(LocalDateTime.now());
        return planRepo.save(plan);
    }

    @Transactional
    public StudyPlan updateCompletedTasks(Long userId, String completedTaskKeysJson) {
        User user = authService.getEntityById(userId);
        StudyPlan plan = planRepo.findByUser(user).orElseGet(() -> createDefaultPlan(user));
        plan.setCompletedTaskKeysJson(completedTaskKeysJson);
        plan.setUpdatedAt(LocalDateTime.now());
        return planRepo.save(plan);
    }

    private StudyPlan createDefaultPlan(User user) {
        String defaultRole = user.getTargetRole() != null ? user.getTargetRole() : "Java Backend Developer";
        String defaultSkill = user.getSkillLevel() != null ? user.getSkillLevel() : "Intermediate";
        int hours = user.getHoursPerDay() != null ? user.getHoursPerDay() : 3;

        StudyPlan plan = new StudyPlan(
                user,
                defaultRole,
                defaultSkill,
                hours,
                4,
                null,
                "[]"
        );
        return planRepo.save(plan);
    }
}
