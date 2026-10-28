package com.beam.service;

import com.beam.dto.ResumeProfileDto;
import com.beam.entity.ResumeProfile;
import com.beam.entity.User;
import com.beam.repository.ResumeProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ResumeService {

    private final ResumeProfileRepository resumeRepo;
    private final AuthService authService;

    public ResumeService(ResumeProfileRepository resumeRepo, AuthService authService) {
        this.resumeRepo = resumeRepo;
        this.authService = authService;
    }

    public ResumeProfileDto getResume(Long userId) {
        User user = authService.getEntityById(userId);
        ResumeProfile profile = resumeRepo.findByUser(user)
                .orElseGet(() -> createInitialProfile(user));
        return new ResumeProfileDto(profile);
    }

    @Transactional
    public ResumeProfileDto saveResume(Long userId, ResumeProfileDto dto) {
        User user = authService.getEntityById(userId);
        ResumeProfile profile = resumeRepo.findByUser(user)
                .orElse(new ResumeProfile(user));

        profile.setFullName(dto.getFullName());
        profile.setHeadline(dto.getHeadline());
        profile.setContactEmail(dto.getContactEmail());
        profile.setPhone(dto.getPhone());
        profile.setLocation(dto.getLocation());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setEducationJson(dto.getEducationJson());
        profile.setSkillsJson(dto.getSkillsJson());
        profile.setProjectsJson(dto.getProjectsJson());
        profile.setInternshipsJson(dto.getInternshipsJson());
        profile.setCertificationsJson(dto.getCertificationsJson());
        profile.setAchievementsJson(dto.getAchievementsJson());
        profile.setUpdatedAt(LocalDateTime.now());

        ResumeProfile saved = resumeRepo.save(profile);
        return new ResumeProfileDto(saved);
    }

    private ResumeProfile createInitialProfile(User user) {
        ResumeProfile profile = new ResumeProfile(user);
        profile.setFullName(user.getName());
        profile.setContactEmail(user.getEmail());
        profile.setHeadline("Aspiring Java Backend Developer | Software Engineer");
        profile.setSkillsJson("[\"Java 17/22\", \"Spring Boot 3\", \"Spring Data JPA\", \"MySQL\", \"REST APIs\", \"Spring Security\", \"React\", \"TypeScript\", \"Docker\", \"Git\"]");
        
        // Real project entry for Beam Academy
        String beamProject = "[{\"title\":\"Beam Academy - AI Placement Platform\",\"role\":\"Full Stack Developer\",\"tech\":\"Java, Spring Boot, MySQL, Spring Security, React, TypeScript, OpenAI API\",\"description\":\"Engineered a full-stack placement preparation SaaS integrating structured Java, SQL, and DSA curriculum with an AI placement coach.\\n• Built secure RESTful APIs using Spring Boot, Spring Security, BCrypt password hashing, and MySQL relational persistence.\\n• Designed interactive DSA practice flows with progressive hints and time/space complexity analysis.\\n• Integrated OpenAI API via server-side Spring Boot client ensuring API keys remain private and protected.\"}]";
        profile.setProjectsJson(beamProject);

        return resumeRepo.save(profile);
    }
}
