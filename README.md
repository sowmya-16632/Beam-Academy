# 🚀 Beam Academy — AI-Powered Placement Preparation Platform

> **From Zero → Software Engineer.** A comprehensive, production-grade placement preparation system engineered with **Spring Boot 3**, **React 18 / TypeScript**, and **MySQL**. Designed to help aspiring Software Engineers and Java Backend Developers master data structures, core Java, SQL, quantitative aptitude, and behavioral interviews.

[![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Key Features & Modules

Beam Academy is built as an end-to-end placement suite comprising 16 integrated modules:

1. **🌐 High-Conversion Landing Page & Placement Roadmap Preview**:
   - Modern edtech landing page communicating fresher placement readiness, 3-step diagnostic framework, and transparent readiness scoring formula.
2. **🎯 Initial Diagnostic Skill Assessment**:
   - Multi-category baseline assessment evaluating Programming Fundamentals, DSA, Aptitude, Core CS, Projects, and Interview Confidence.
   - Computes placement readiness baseline and persists target role, study hours, and weak areas directly to MySQL user profile.
3. **📊 Real-Time Placement Dashboard & Daily Planner**:
   - Dynamic readiness score calculated transparently across DSA, Java, SQL, and Aptitude metrics.
   - Daily study mission checklist with time allotments, priority badges, and one-click completion.
   - Live session stopwatch timer and end-of-day reflection journal.
4. **☕ Java Engineering Curriculum**:
   - 11 comprehensive modules: Fundamentals (JVM/Memory), OOP, Collections Framework, Multithreading & Concurrency, Java 8 Streams, Exception Architecture, and Spring Boot Backend Development.
   - Interactive topic checklists, personal notes taking, and instant revision bookmarking.
5. **🧩 DSA Pattern Mastery & In-Browser Test Runner**:
   - 12 high-frequency interview patterns with search, difficulty, and completion filtering.
   - In-browser sandboxed test runner for JavaScript/algorithmic validation without dangerous server-side execution.
   - Progressive hints reveal system (`Think` → `Hint 1` → `Hint 2` → `Approach` → `Solution Code` → `Complexity Analysis`).
6. **🗄️ SQL & Relational Database Mastery**:
   - 16 interview-tested topics: Joins, Group By/Having, Subqueries, Window Functions, Indexing (B-Tree/Hash), ACID transactions, Query Optimization, and Sharding concepts.
7. **🧠 Quantitative, Logical & Verbal Aptitude Engine**:
   - Multi-category timed aptitude test engine with step-by-step mathematical explanations.
8. **🎙️ Technical Interview Simulator & AI Mock Practice**:
   - Curated vault of high-frequency interview questions with structured definitions, syntax, and follow-up traps.
   - Audio/text-based answer practice with confidence ratings and revision reminders.
9. **🤖 AI Placement Coach**:
   - Server-side LLM proxy with zero-client key leakage and 100% deterministic fallback.
10. **💼 Career Toolkit & Resume Studio**:
    - Multi-tab toolkit: Live ATS scanner, 90-second Self-Introduction generator, STAR-method behavioral response builder, and Job Application Pipeline tracker.
11. **🛠️ Guided Portfolio Projects**:
    - 3 portfolio-grade projects (Distributed URL Shortener, Spring Boot Placement Portal, Real-Time Chat & Collaboration Engine).
    - Architecture blueprints, milestones, test checklists, STAR interview talking points, and personal GitHub tracker.
12. **🔄 Spaced Repetition Revision Vault**:
    - Leitner-style active recall flashcards with interval scheduling (1 day, 3 days, 7 days) and direct bookmarks from DSA/topics.
13. **🗺️ Multi-Track Placement Roadmaps**:
    - Software Development Engineer, Java Backend Developer, and Full-Stack Developer tracks.
14. **🔔 In-App Notification Center**:
    - Activity reminders, streak milestones, revision nudges, and urgent tasks directly in the top navigation.
15. **🛡️ Administrator Telemetry Portal**:
    - Protected dashboard displaying Spring Boot Actuator telemetry, database connectivity, and student directory with roles and study hours.
16. **🔐 Secure Authentication & Role-Based Access Control**:
    - Stateless JWT authentication, BCrypt password hashing, and role checks (`LEARNER` / `ADMIN`).

---

## 🏗️ Technical Architecture

Beam Academy enforces a strict 3-tier enterprise architecture:

```text
┌────────────────────────────────────────────────────────┐
│             React 18 + Vite + TypeScript               │
│       (SPA Client, Typed API Client, Glassmorphic UI)   │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON REST
                           ▼
┌────────────────────────────────────────────────────────┐
│               Spring Boot 3.x REST API                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Security Filter Chain (JwtAuthFilter + BCrypt)   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Controller Layer (10 REST Controllers)           │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Service Layer (Business Logic & Real Metrics)    │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Repository Layer (7 Spring Data JPA Repos)       │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ AI Coach Service (OpenAI Proxy + Fallback)       │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────┬──────────────────────────┬─────────────┘
                │ JDBC / JPA               │ HTTPS
                ▼                          ▼
┌───────────────────────────────┐  ┌─────────────────────┐
│        MySQL Database         │  │   OpenAI Platform   │
│ (7 Normalized Entities)       │  │   (Server-to-Server)│
└───────────────────────────────┘  └─────────────────────┘
```

For complete technical specifications, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 💻 Tech Stack

- **Backend**: Java 17+, Spring Boot 3.x, Spring Security, Spring Data JPA, JJWT, Hibernate, Spring Boot Actuator, RestClient.
- **Frontend**: React 18, Vite 5, TypeScript 5, Lucide React, Modular CSS with CSS Variables.
- **Database**: MySQL 8.0+ (HikariCP connection pool).
- **Tooling**: Maven (`mvnw`), npm, Docker Compose, Windows PowerShell scripts.

---

## ⚡ Quickstart Guide

### Prerequisites
- Java 17 or higher installed (`java -version`)
- Node.js 18+ and npm installed (`node -v`, `npm -v`)
- MySQL 8.0 running locally (or via Docker)

---

### Step 1: Database Setup

Ensure MySQL is running on port 3306. Create the database:

```sql
CREATE DATABASE IF NOT EXISTS beam_academy;
```

*(Alternatively, use Docker Compose)*:
```bash
docker compose up -d mysql
```

---

### Step 2: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Ensure your credentials in `.env` match your local setup:
```properties
SERVER_PORT=8081
DB_URL=jdbc:mysql://localhost:3306/beam_academy?createDatabaseIfNotExist=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DDL_AUTO=update
OPENAI_API_KEY=your_optional_openai_key
VITE_API_URL=http://localhost:8081/api
```

---

### Step 3: Run the Application

#### Option A: One-Click Startup on Windows (PowerShell)
```powershell
.\scripts\start-windows.ps1
```

#### Option B: Manual Startup

**1. Start the Spring Boot Backend:**
```powershell
# Windows
cd backend-app
.\mvnw.cmd spring-boot:run

# Mac / Linux
cd backend-app
./mvnw spring-boot:run
```
*Backend runs at `http://localhost:8081`.*  
*Health Check: `http://localhost:8081/actuator/health`*

**2. Start the React Frontend:**
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## 🔌 REST API Inventory

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/actuator/health` | Spring Boot Actuator health status | No |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT Bearer token | No |
| `GET` | `/api/auth/me` | Retrieve profile of authenticated user | Yes |
| `GET` | `/api/dashboard/stats` | Unified dashboard stats & recent activity | Yes |
| `POST` | `/api/courses/toggle` | Toggle completion of a Java or SQL topic | Yes |
| `GET` | `/api/courses/progress` | Fetch all completed topic IDs for the user | Yes |
| `POST` | `/api/dsa/attempts` | Record problem attempt (status, notes, hints) | Yes |
| `GET` | `/api/dsa/attempts` | Fetch problem attempt history | Yes |
| `POST` | `/api/aptitude/attempts` | Save score and time for an aptitude quiz | Yes |
| `GET` | `/api/aptitude/attempts` | Fetch aptitude attempt history | Yes |
| `POST` | `/api/interview/practices` | Record interview practice rating and notes | Yes |
| `GET` | `/api/interview/practices` | Fetch interview practice history | Yes |
| `GET` | `/api/progress` | Comprehensive readiness calculation | Yes |
| `GET` | `/api/study-plan` | Retrieve current placement study plan | Yes |
| `POST` | `/api/study-plan` | Save or update placement study plan | Yes |
| `GET` | `/api/resume` | Retrieve user resume profile | Yes |
| `PUT` | `/api/auth/profile/{id}` | Update learner goals, weak areas, assessment results | Yes |
| `POST` | `/api/ai/coach` | Ask AI placement coach (OpenAI or fallback) | Yes |
| `GET` | `/api/admin/overview` | Platform analytics & system telemetry | Yes (ADMIN) |
| `GET` | `/api/admin/users` | All registered learners and active goals | Yes (ADMIN) |

*A complete [test.http](backend-app/test.http) file is included for testing all endpoints in VS Code REST Client or IntelliJ.*

---

## 🗃️ Database Schema

The database consists of 7 normalized relational tables:
- `users`: Core account data, email index, and BCrypt-hashed credentials.
- `topic_completions`: Tracks completion status for Java and SQL curriculum topics.
- `practice_attempts`: DSA problem drill submissions, status (`COMPLETED`/`ATTEMPTED`), notes, and hints revealed.
- `aptitude_attempts`: Aptitude quiz performance records (category, total questions, score, time taken).
- `interview_practices`: Interview question self-assessment ratings (`CONFIDENT`, `NEEDS_PRACTICE`, `REVISIT`) and personal prep notes.
- `study_plans`: Personalized study timetable (target weeks, current day, focus area).
- `resume_profiles`: User resume targets, technical skill strings, and professional summaries.

---

## 🛡️ Security Best Practices

1. **Password Hashing**: BCrypt algorithm with automatic salt generation; plain passwords never touch database disks.
2. **Stateless JWT**: Standard Authorization header format `Bearer <token>` with expiration checking and signature verification.
3. **Environment-Driven Configuration**: Database passwords and API keys are injected via environment variables; secrets are git-ignored.
4. **Input Validation**: `@Valid` annotations on incoming request payloads protect against malformed data.
5. **No Client-Side AI Keys**: The frontend never has access to `OPENAI_API_KEY`. All LLM calls are orchestrated and sanitized on the backend.

---

## 💼 Resume Highlights

For your resume, portfolio, or technical interviews, this project demonstrates:
- **Enterprise Java & Spring Boot**: Designed scalable REST APIs adhering to the Controller-Service-Repository pattern with Spring Boot 3.
- **Relational Data Modeling**: Structured MySQL relational schemas with JPA/Hibernate entity mappings and foreign key relationships.
- **Security & Identity**: Implemented stateless authentication using Spring Security and JWT, with BCrypt password hashing.
- **Dynamic Business Metrics**: Engineered progress calculation algorithms calculating multi-dimensional interview readiness scores from real database records.
- **Resilient AI System Integration**: Built a server-side AI proxy with deterministic heuristic fallback handling API unavailability gracefully.
- **Modern Full-Stack Integration**: Integrated a high-performance React 18 + Vite frontend with TypeScript type safety and reactive state synchronization.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
