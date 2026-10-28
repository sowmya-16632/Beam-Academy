export interface InterviewQuestionItem {
  id: string;
  category: "Java" | "OOP" | "SQL" | "DBMS" | "DSA" | "Spring Boot" | "REST APIs" | "Operating Systems" | "Computer Networks" | "HR";
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  conciseAnswer: string;
  detailedExplanation: string;
  followUpQuestion: string;
}

export const interviewQuestionsBank: InterviewQuestionItem[] = [
  // Java
  {
    id: "java-int-1",
    category: "Java",
    difficulty: "Medium",
    question: "Why does HashMap in Java 8+ convert linked lists to Red-Black Trees?",
    conciseAnswer: "To prevent O(n) degradation under malicious hash collision attacks (DoS) by bounding worst-case lookup to O(log n).",
    detailedExplanation:
      "Prior to Java 8, hash collisions formed a linked list with O(n) search time. If an attacker created keys with identical hash codes, GET operations became O(n), freezing the server. In Java 8+, when bucket size reaches TREEIFY_THRESHOLD (8) and total table capacity >= 64, the bucket is transformed into a balanced Red-Black tree (TreeNode) providing guaranteed O(log n) performance.",
    followUpQuestion: "When does a treeified bucket convert back to a linked list? (Answer: during resize/removal when element count drops <= UNTREEIFY_THRESHOLD (6))."
  },
  {
    id: "java-int-2",
    category: "Java",
    difficulty: "Easy",
    question: "What happens when an exception is thrown inside a finally block?",
    conciseAnswer: "The new exception suppresses/overrides any exception previously thrown in the try or catch block.",
    detailedExplanation:
      "If a try block throws Exception A, and the corresponding finally block throws Exception B, Exception B propagates to the caller while Exception A is lost (unless suppressed via try-with-resources in Java 7+). Clean code avoids throwing exceptions from inside finally.",
    followUpQuestion: "Does a finally block execute if System.exit(0) is called in try? (Answer: No, the JVM process terminates immediately)."
  },

  // OOP
  {
    id: "oop-int-1",
    category: "OOP",
    difficulty: "Medium",
    question: "Explain the Liskov Substitution Principle (LSP) with an example.",
    conciseAnswer: "Subtypes must be substitutable for their base types without altering program correctness.",
    detailedExplanation:
      "A classic violation is Square inheriting from Rectangle. If Rectangle has setWidth(w) and setHeight(h), client code expects changing width not to change height. However, in Square, changing width must also alter height to maintain square geometry, breaking client assumptions. Subclasses should only enhance, not contradict, parent contracts.",
    followUpQuestion: "How do you redesign the Rectangle-Square problem cleanly? (Answer: Have both implement a common Shape interface with an area() method, rather than inheritance)."
  },

  // SQL & DBMS
  {
    id: "dbms-int-1",
    category: "DBMS",
    difficulty: "Hard",
    question: "What is the difference between Optimistic and Pessimistic Locking?",
    conciseAnswer: "Pessimistic locking locks records at the database level during read; Optimistic locking checks a version column at commit time.",
    detailedExplanation:
      "Pessimistic locking (SELECT ... FOR UPDATE) blocks other transactions until the lock is released, which prevents conflicts but increases latency and risk of deadlocks. Optimistic locking (@Version in JPA) allows concurrent reads/writes without locks; when updating, it runs 'UPDATE tbl SET val = ?, version = version + 1 WHERE id = ? AND version = ?'. If rows updated is 0, another transaction won, throwing OptimisticLockException.",
    followUpQuestion: "When should you prefer Optimistic locking over Pessimistic locking? (Answer: High-read, low-conflict web systems like e-commerce browsing; Pessimistic for high-conflict finite inventory reservation)."
  },
  {
    id: "sql-int-1",
    category: "SQL",
    difficulty: "Medium",
    question: "How do you find the Nth highest salary in SQL without vendor-specific LIMIT?",
    conciseAnswer: "Using standard DENSE_RANK() window function: SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM employees) t WHERE rnk = N;",
    detailedExplanation:
      "DENSE_RANK() assigns consecutive ranks without gaps even when duplicate salaries exist (e.g. 100k, 100k, 90k yields ranks 1, 1, 2). Filtering by rnk = N precisely yields the Nth distinct highest salary regardless of duplicates.",
    followUpQuestion: "What is the difference between RANK() and DENSE_RANK()? (Answer: RANK() skips rank numbers on duplicates, e.g., 1, 1, 3; DENSE_RANK() does not skip, e.g., 1, 1, 2)."
  },

  // Spring Boot
  {
    id: "spring-int-1",
    category: "Spring Boot",
    difficulty: "Medium",
    question: "What is the Spring Bean lifecycle?",
    conciseAnswer: "Instantiate -> Populate Properties -> Aware Interfaces -> BeanPostProcessor BeforeInit -> @PostConstruct/init-method -> BeanPostProcessor AfterInit -> Live -> @PreDestroy/destroy.",
    detailedExplanation:
      "Spring IoC container discovers bean definitions, calls constructor via reflection, injects autowired dependencies, calls BeanNameAware/BeanFactoryAware, invokes BeanPostProcessor.postProcessBeforeInitialization, invokes @PostConstruct or InitializingBean.afterPropertiesSet(), then applies postProcessAfterInitialization (which creates dynamic CGLIB proxies for @Transactional or @Async).",
    followUpQuestion: "Why does self-invocation of a @Transactional method inside the same class bypass the transaction? (Answer: Because calling this.method() bypasses the Spring CGLIB proxy wrapper)."
  },

  // REST APIs
  {
    id: "rest-int-1",
    category: "REST APIs",
    difficulty: "Easy",
    question: "What is the difference between PUT and PATCH in RESTful design?",
    conciseAnswer: "PUT performs complete entity replacement (idempotent); PATCH applies partial field modifications (may or may not be idempotent).",
    detailedExplanation:
      "When issuing a PUT request, missing fields in the payload are expected to be replaced with null or default values. With PATCH, the client transmits only the fields to be updated, leaving untouched fields intact.",
    followUpQuestion: "What HTTP status code should be returned after a successful POST creating a resource? (Answer: 201 Created with a Location header)."
  },

  // Operating Systems
  {
    id: "os-int-1",
    category: "Operating Systems",
    difficulty: "Medium",
    question: "What are the four necessary conditions for Deadlock?",
    conciseAnswer: "1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.",
    detailedExplanation:
      "Deadlock happens when a set of processes are blocked because each holds a resource while waiting for another resource held by another process. Breaking any one of the four Coffman conditions prevents deadlock. In Java, circular wait is prevented by always acquiring locks in a globally defined order.",
    followUpQuestion: "How does the Operating System recover from a detected deadlock? (Answer: Process termination or resource preemption with rollback)."
  },

  // Computer Networks
  {
    id: "networks-int-1",
    category: "Computer Networks",
    difficulty: "Easy",
    question: "Explain the TCP 3-Way Handshake.",
    conciseAnswer: "Client sends SYN -> Server responds SYN-ACK -> Client replies ACK. Connection is established.",
    detailedExplanation:
      "1. SYN: Client sends packet with initial sequence number x. 2. SYN-ACK: Server receives SYN, allocates buffers, responds with sequence number y and ACK x+1. 3. ACK: Client acknowledges with ACK y+1. This ensures both parties confirm the bidirectional link is functional before sending application data.",
    followUpQuestion: "Why is a 2-way handshake insufficient? (Answer: Delayed duplicate SYN packets could cause the server to open phantom connections without client confirmation)."
  },

  // HR
  {
    id: "hr-int-1",
    category: "HR",
    difficulty: "Easy",
    question: "Tell me about a challenging technical bug you encountered and how you solved it.",
    conciseAnswer: "Structure using STAR: Situation, Task, Action, and Result with quantifiable outcomes and learnings.",
    detailedExplanation:
      "When explaining technical debugging to interviewers: clearly state the symptoms (e.g. Circular placeholder resolution or 500 errors on startup), how you investigated the root cause using log traces and debugger analysis, the concrete fix you applied, and what preventative guardrails (like unit tests or schema validation) you added.",
    followUpQuestion: "What did you learn about system design from that experience?"
  }
];
