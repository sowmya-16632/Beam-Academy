package com.beam.controller;

import com.beam.dto.AuthRequest;
import com.beam.dto.AuthResponse;
import com.beam.dto.SignupRequest;
import com.beam.dto.UserDto;
import com.beam.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest req) {
        AuthResponse response = authService.signup(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        AuthResponse response = authService.login(req);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserDto> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(authService.getUserProfile(userId));
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<UserDto> updateProfile(@PathVariable Long userId, @RequestBody UserDto dto) {
        return ResponseEntity.ok(authService.updateProfile(userId, dto));
    }
}
