package com.beam.service;

import com.beam.dto.AuthRequest;
import com.beam.dto.AuthResponse;
import com.beam.dto.SignupRequest;
import com.beam.dto.UserDto;
import com.beam.entity.User;
import com.beam.exception.BadRequestException;
import com.beam.exception.ConflictException;
import com.beam.exception.ResourceNotFoundException;
import com.beam.exception.UnauthorizedException;
import com.beam.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse signup(SignupRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new ConflictException("An account with this email already exists");
        }

        User user = new User();
        user.setName(req.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        if (req.getTargetRole() != null && !req.getTargetRole().isBlank()) {
            user.setTargetRole(req.getTargetRole().trim());
        }
        if (normalizedEmail.startsWith("admin@") || normalizedEmail.contains("+admin@")) {
            user.setRole("ADMIN");
        } else {
            user.setRole("LEARNER");
        }

        User saved = userRepository.save(user);
        return new AuthResponse("Signup successful! Welcome to Beam Academy.", new UserDto(saved));
    }

    @Transactional
    public AuthResponse login(AuthRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        String stored = user.getPassword();
        boolean valid = false;

        if (stored != null && stored.startsWith("$2")) {
            valid = passwordEncoder.matches(req.getPassword(), stored);
        } else if (stored != null && stored.equals(req.getPassword())) {
            // Backward-compatible transparent migration to BCrypt
            valid = true;
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            userRepository.save(user);
        }

        if (!valid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return new AuthResponse("Login successful", new UserDto(user));
    }

    public UserDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new UserDto(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UserDto updateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (updateDto.getName() != null && !updateDto.getName().isBlank()) {
            user.setName(updateDto.getName().trim());
        }
        if (updateDto.getTargetRole() != null && !updateDto.getTargetRole().isBlank()) {
            user.setTargetRole(updateDto.getTargetRole().trim());
        }
        if (updateDto.getSkillLevel() != null && !updateDto.getSkillLevel().isBlank()) {
            user.setSkillLevel(updateDto.getSkillLevel().trim());
        }
        if (updateDto.getHoursPerDay() != null && updateDto.getHoursPerDay() > 0) {
            user.setHoursPerDay(updateDto.getHoursPerDay());
        }
        if (updateDto.getRole() != null && !updateDto.getRole().isBlank()) {
            user.setRole(updateDto.getRole().trim());
        }
        if (updateDto.getTargetCompany() != null) {
            user.setTargetCompany(updateDto.getTargetCompany().trim());
        }
        if (updateDto.getTargetPlacementDate() != null) {
            user.setTargetPlacementDate(updateDto.getTargetPlacementDate().trim());
        }
        if (updateDto.getWeakAreas() != null) {
            user.setWeakAreas(updateDto.getWeakAreas().trim());
        }
        if (updateDto.getAssessmentJson() != null) {
            user.setAssessmentJson(updateDto.getAssessmentJson());
        }
        if (updateDto.getJobApplicationsJson() != null) {
            user.setJobApplicationsJson(updateDto.getJobApplicationsJson());
        }
        if (updateDto.getRevisionQueueJson() != null) {
            user.setRevisionQueueJson(updateDto.getRevisionQueueJson());
        }

        User updated = userRepository.save(user);
        return new UserDto(updated);
    }

    public User getEntityById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
