package com.beam.controller;

import com.beam.dto.CertificateDto;
import com.beam.dto.IssueCertificateRequest;
import com.beam.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping("/eligibility/{userId}/{courseId}")
    public ResponseEntity<CertificateDto> checkEligibility(
            @PathVariable Long userId,
            @PathVariable String courseId) {
        return ResponseEntity.ok(certificateService.checkEligibility(userId, courseId));
    }

    @PostMapping("/issue/{userId}")
    public ResponseEntity<CertificateDto> issueCertificate(
            @PathVariable Long userId,
            @RequestBody IssueCertificateRequest request) {
        return ResponseEntity.ok(certificateService.issueCertificate(userId, request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CertificateDto>> getUserCertificates(@PathVariable Long userId) {
        return ResponseEntity.ok(certificateService.getUserCertificates(userId));
    }

    @GetMapping("/verify/{certificateId}")
    public ResponseEntity<CertificateDto> verifyCertificate(@PathVariable String certificateId) {
        return ResponseEntity.ok(certificateService.verifyCertificate(certificateId));
    }
}
