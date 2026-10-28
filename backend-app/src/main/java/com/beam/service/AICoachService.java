package com.beam.service;

import com.beam.dto.AICoachRequest;
import com.beam.dto.AICoachResponse;
import com.beam.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.*;

@Service
public class AICoachService {

    private static final Logger log = LoggerFactory.getLogger(AICoachService.class);

    private final RestClient client;
    private final AuthService authService;

    @Value("${beam.openai.api-key:${OPENAI_API_KEY:}}")
    private String apiKey;

    @Value("${beam.openai.model:${OPENAI_MODEL:gpt-4o-mini}}")
    private String model;

    public AICoachService(RestClient.Builder builder, AuthService authService) {
        this.client = builder.baseUrl("https://api.openai.com/v1").build();
        this.authService = authService;
    }

    public AICoachResponse coach(Long userId, AICoachRequest req) {
        String prompt = req.getPrompt() != null ? req.getPrompt().trim() : "";
        if (prompt.isBlank()) {
            return new AICoachResponse("Please provide a question or topic for the coach.", "OFFLINE", model);
        }

        // Check if API key is present
        if (apiKey == null || apiKey.isBlank() || apiKey.equalsIgnoreCase("CHANGE_ME")) {
            return generateLocalFallback(userId, req);
        }

        try {
            // Build context
            String systemInstructions = buildSystemPrompt(userId, req);

            Map<String, Object> requestPayload = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", systemInstructions),
                    Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7
            );

            Map<?, ?> response = client.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestPayload)
                    .retrieve()
                    .body(Map.class);

            String answer = extractOpenAIResponse(response);
            return new AICoachResponse(answer, "ONLINE", model);

        } catch (Exception ex) {
            log.warn("OpenAI call failed ({}). Providing fallback placement coach response.", ex.getMessage());
            return generateLocalFallback(userId, req);
        }
    }

    private String buildSystemPrompt(Long userId, AICoachRequest req) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are Beam Academy's Placement Coach, specializing in Java Backend and Software Engineering placement interviews. ");
        sb.append("Give concise, accurate, practical, and interview-ready guidance. Focus on clean code, edge cases, time/space complexity, and relational DBMS best practices. ");

        if (userId != null) {
            try {
                User user = authService.getEntityById(userId);
                sb.append("Candidate Name: ").append(user.getName()).append(". ");
                sb.append("Target Role: ").append(user.getTargetRole()).append(". ");
                sb.append("Skill Level: ").append(user.getSkillLevel()).append(". ");
            } catch (Exception ignored) {}
        }

        if (req.getCourseContext() != null && !req.getCourseContext().isBlank()) {
            sb.append("Current Course Module: ").append(req.getCourseContext()).append(". ");
        }
        if (req.getProblemContext() != null && !req.getProblemContext().isBlank()) {
            sb.append("Active Problem/Topic: ").append(req.getProblemContext()).append(". ");
        }
        if (req.getCurrentCode() != null && !req.getCurrentCode().isBlank()) {
            sb.append("Candidate Code Snippet:\n```\n").append(req.getCurrentCode()).append("\n```\n");
        }

        return sb.toString();
    }

    private String extractOpenAIResponse(Map<?, ?> response) {
        if (response != null && response.get("choices") instanceof List<?> choices && !choices.isEmpty()) {
            Object firstChoice = choices.get(0);
            if (firstChoice instanceof Map<?, ?> choiceMap && choiceMap.get("message") instanceof Map<?, ?> messageMap) {
                Object content = messageMap.get("content");
                if (content instanceof String text) {
                    return text.trim();
                }
            }
        }
        return "No response could be parsed from the AI provider.";
    }

    private AICoachResponse generateLocalFallback(Long userId, AICoachRequest req) {
        String query = req.getPrompt().toLowerCase();
        StringBuilder reply = new StringBuilder();

        reply.append("ℹ️ [Beam Mentor — Offline Guided Intelligence]\n");
        reply.append("Live external AI key is not configured; running high-yield local curriculum engine:\n\n");

        if (query.contains("beginner") || query.contains("from zero") || query.contains("explain like") || query.contains("simple")) {
            reply.append("🎓 **Beginner-Friendly Conceptual Explanation**:\n")
                 .append("• **The Big Picture**: Think of writing software like giving a cooking recipe to a robot. Computers only do exactly what we tell them, step by step.\n")
                 .append("• **Key Foundation**: Every program consists of:\n")
                 .append("   1. **State (Variables)**: Boxes in memory where data is kept (numbers, text, true/false).\n")
                 .append("   2. **Logic (Conditions & Loops)**: Decision gates ('if hungry, eat') and repetitions ('repeat until done').\n")
                 .append("   3. **Actions (Functions/Methods)**: Reusable mini-recipes that take an input and return an output.\n")
                 .append("• **Next Step**: Start by writing small 5-line exercises before building full applications. Master inputs, outputs, and conditional checks first!\n");
        } else if (query.contains("hint") || query.contains("stuck") || query.contains("clue")) {
            reply.append("💡 **Progressive Mentor Hint**:\n")
                 .append("• **Level 1 (Thought Process)**: Have you traced what happens on the smallest possible input? (e.g., an empty list, a single element, or negative numbers).\n")
                 .append("• **Level 2 (Data Structure Choice)**: If you are doing nested loops O(N²), what data structure gives you O(1) lookups? A Hash Map / Set is usually the answer.\n")
                 .append("• **Level 3 (Two Pointers/Pointers)**: If the array is sorted, can you place one pointer at the start and one at the end instead of re-scanning?\n");
        } else if (query.contains("dry run") || query.contains("walkthrough") || query.contains("line by line")) {
            reply.append("🔍 **Step-by-Step Code Dry-Run Guidance**:\n")
                 .append("1. **Initialize State**: Set up a trace table with columns for each variable (`i`, `current`, `sum`, `result`).\n")
                 .append("2. **Loop Iteration 0**: Record initial values before the loop executes.\n")
                 .append("3. **Loop Iteration 1..N**: For each step, write down how variables change and what condition is evaluated.\n")
                 .append("4. **Termination Check**: Verify when the exit condition becomes true and confirm the final return value matches expected output.\n");
        } else if (query.contains("python") || query.contains("django") || query.contains("flask")) {
            reply.append("🐍 **Python Engineering Track Guidance**:\n")
                 .append("• **Core Pythonic Practices**: Use list comprehensions, generator expressions for memory efficiency, and `with` context managers for resource safety.\n")
                 .append("• **Data Structures**: Master dicts (O(1) average lookup), sets, tuples (immutable), and `collections.deque` for fast double-ended queues.\n")
                 .append("• **Backend & APIs**: Use FastAPI or Django REST Framework with Pydantic type validation and SQLAlchemy / Django ORM for migrations.\n");
        } else if (query.contains("frontend") || query.contains("react") || query.contains("vite") || query.contains("tailwind")) {
            reply.append("⚛️ **Frontend Engineering Guidance**:\n")
                 .append("• **React State Rules**: Treat state as strictly immutable. Always compute derived values during render rather than syncing duplicate states.\n")
                 .append("• **Component Design**: Separate UI Presentation components from Data Fetching container logic.\n")
                 .append("• **Performance**: Use React 18/19 transitions for non-urgent updates, memoize heavy computations with `useMemo`, and debounce search inputs.\n");
        } else if (query.contains("dsa") || query.contains("two sum") || query.contains("array") || query.contains("hash") || query.contains("tree")) {
            reply.append("⚡ **DSA Pattern Mastery Strategy**:\n")
                 .append("1. **Constraint Analysis**: If N <= 10^5, aim for O(N) or O(N log N). Never use O(N²) for N > 5,000 in online assessments.\n")
                 .append("2. **Frequency/Pair Lookups**: Auxiliary `HashMap` drops lookup time from O(N) to O(1).\n")
                 .append("3. **Edge Cases to State in Interviews**: Empty array, all duplicate elements, target not found, integer overflow.\n");
        } else if (query.contains("spring") || query.contains("rest") || query.contains("controller") || query.contains("java")) {
            reply.append("☕ **Java & Spring Boot Architecture**:\n")
                 .append("1. **Layered Architecture**: Strict separation: `Controller (HTTP/DTO)` -> `Service (Business Rules)` -> `Repository (Spring Data JPA)`.\n")
                 .append("2. **Exception Handling**: Use `@RestControllerAdvice` with `@ExceptionHandler` for uniform JSON error responses.\n")
                 .append("3. **Security & JPA**: Use BCrypt hashing (strength >= 12), JWT stateless auth, and avoid N+1 queries using `JOIN FETCH` or `@EntityGraph`.\n");
        } else if (query.contains("sql") || query.contains("database") || query.contains("join") || query.contains("query")) {
            reply.append("🗄️ **Relational SQL & Database Optimization**:\n")
                 .append("1. **Logical Execution Order**: `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY` -> `LIMIT`.\n")
                 .append("2. **Indexing Best Practices**: Create composite indexes on `(equality_column, range_column)`. Avoid leading wildcards like `LIKE '%term'` which cause full table scans.\n")
                 .append("3. **ACID Transactions**: Ensure write atomicity and use appropriate isolation levels (READ COMMITTED / REPEATABLE READ) to prevent phantom reads.\n");
        } else {
            reply.append("🎯 **Beam Mentor Career Preparation Advice**:\n")
                 .append("• Focus on deep conceptual understanding rather than memorizing solutions.\n")
                 .append("• In technical interviews, interviewers evaluate how you communicate trade-offs, handle edge cases, and design clean, maintainable systems.\n\n")
                 .append("💡 *To enable full dynamic generative AI coaching with OpenAI, configure `OPENAI_API_KEY` in `application.properties` or system environment variables.*");
        }

        return new AICoachResponse(reply.toString(), "FALLBACK", "offline-curriculum-engine");
    }
}
