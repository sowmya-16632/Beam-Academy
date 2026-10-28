export interface JavaTopic {
  id: string;
  category: "Fundamentals" | "Core Java" | "Backend Spring Boot";
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  explanation: string;
  exampleCode: string;
  keyPoints: string[];
  interviewQuestions: {
    question: string;
    answer: string;
    followUp?: string;
  }[];
  practiceQuestions: string[];
}

export const javaCurriculum: JavaTopic[] = [
  {
    id: "java-basics",
    category: "Fundamentals",
    title: "Java Basics & JVM Architecture",
    difficulty: "Beginner",
    estimatedMinutes: 25,
    explanation:
      "Java is a strongly-typed, object-oriented language. Source code (.java) compiles into bytecode (.class), executed on the Java Virtual Machine (JVM). The JVM manages memory via the Garbage Collector and provides WORA (Write Once, Run Anywhere) platform independence.",
    exampleCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Beam Academy!");
        int candidateScore = 95;
        System.out.println("Readiness: " + candidateScore + "%");
    }
}`,
    keyPoints: [
      "JDK contains the JRE, compiler (javac), and developer tools.",
      "JRE provides runtime libraries and the JVM to run bytecode.",
      "JIT (Just-In-Time) compiler compiles bytecode into native machine instructions at runtime.",
      "Platform independence is at the bytecode level, though the JVM itself is OS-dependent."
    ],
    interviewQuestions: [
      {
        question: "Why is Java platform independent but JVM platform dependent?",
        answer: "Java bytecode (.class) runs on any system with a compatible JVM, making Java independent. However, each operating system requires a native JVM implementation specifically built for its hardware architecture."
      },
      {
        question: "What is the difference between JDK, JRE, and JVM?",
        answer: "JVM executes bytecode. JRE = JVM + standard runtime class libraries. JDK = JRE + development tools like javac, jdb, and jar."
      }
    ],
    practiceQuestions: [
      "Explain the execution flow when running 'java Main.java'.",
      "Declare primitive variables for byte, short, int, long, float, double, boolean, and char."
    ]
  },
  {
    id: "variables-datatypes",
    category: "Fundamentals",
    title: "Variables, Data Types & Operators",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    explanation:
      "Java has 8 primitive data types (byte, short, int, long, float, double, boolean, char) stored directly on the call stack, and Reference Types (Objects, Arrays, Strings) whose references live on the stack while instances live on the heap.",
    exampleCode: `int primitiveInt = 42; // Stack
Integer boxedInt = Integer.valueOf(42); // Heap object
boolean isMatch = (primitiveInt == boxedInt); // Auto-unboxing`,
    keyPoints: [
      "Primitives are pass-by-value with zero object overhead.",
      "Wrapper classes provide nullability and utility methods (e.g., Integer.parseInt).",
      "Bitwise vs logical operators: & and | evaluate both sides; && and || short-circuit.",
      "Type promotion automatically widens bytes/shorts to ints in arithmetic operations."
    ],
    interviewQuestions: [
      {
        question: "What is Autoboxing and Unboxing, and what is its performance impact?",
        answer: "Autoboxing is the automatic conversion between primitives and their wrapper classes. In tight loops, autoboxing introduces unwanted object allocation and garbage collection pressure."
      }
    ],
    practiceQuestions: [
      "Demonstrate why '0.1 + 0.2 != 0.3' in double precision arithmetic and how BigDecimal solves this."
    ]
  },
  {
    id: "control-flow",
    category: "Fundamentals",
    title: "Conditions, Loops & Methods",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    explanation:
      "Decision making uses if-else, switch (with pattern matching in modern Java), and loops (for, while, do-while, enhanced for). Methods in Java are strictly pass-by-value.",
    exampleCode: `public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    keyPoints: [
      "Java methods are strictly Pass-By-Value: object references are passed by value, not the object itself.",
      "switch statements in Java 17+ support pattern matching and yield expressions.",
      "do-while loops guarantee at least one execution."
    ],
    interviewQuestions: [
      {
        question: "Is Java pass-by-reference or pass-by-value?",
        answer: "Java is strictly pass-by-value. When an object is passed, the copy of the memory address (reference handle) is passed by value. Reassigning the parameter does not affect the caller's reference."
      }
    ],
    practiceQuestions: [
      "Write a method to test whether a given integer is prime in O(sqrt(n))."
    ]
  },
  {
    id: "arrays-strings",
    category: "Fundamentals",
    title: "Arrays & String Pool Immutability",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    explanation:
      "Arrays are fixed-size, continuous heap allocations with O(1) indexed access. Strings are immutable objects backed by byte arrays in Java 9+ (Compact Strings). String literals are interned in the String Constant Pool to conserve memory.",
    exampleCode: `String s1 = "Placement"; // Interned in String Constant Pool
String s2 = new String("Placement"); // New Heap instance
System.out.println(s1 == s2); // false (reference check)
System.out.println(s1.equals(s2)); // true (content check)`,
    keyPoints: [
      "Strings are immutable for security, thread-safety, and caching hash codes.",
      "StringBuilder is mutable and not thread-safe (fastest for single threads).",
      "StringBuffer is synchronized and thread-safe.",
      "Arrays in Java know their length and perform bounds checking at runtime."
    ],
    interviewQuestions: [
      {
        question: "Why is String immutable in Java?",
        answer: "1. String Constant Pool optimization requires immutability. 2. Thread safety without locks. 3. Security (file paths, network connections, and DB credentials cannot be tampered with). 4. Cached hashCode ensures reliable HashMap performance."
      },
      {
        question: "Difference between String, StringBuilder, and StringBuffer?",
        answer: "String is immutable. StringBuilder is mutable and not thread-safe (ideal for local string building). StringBuffer is mutable and synchronized for concurrent access."
      }
    ],
    practiceQuestions: [
      "Reverse an array in-place using two pointers.",
      "Count occurrences of every character in a String using an int[256] frequency array."
    ]
  },
  {
    id: "oop",
    category: "Core Java",
    title: "OOP: Encapsulation, Inheritance, Polymorphism & Abstraction",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    explanation:
      "Object-Oriented Programming models software as interacting objects. The four pillars are Encapsulation (data hiding), Inheritance (code reuse via 'is-a'), Polymorphism (compile-time overloading and runtime overriding), and Abstraction (hiding implementation details via interfaces/abstract classes).",
    exampleCode: `public interface NotificationService {
    void send(String message);
}

public class EmailNotification implements NotificationService {
    @Override
    public void send(String message) {
        System.out.println("Emailing: " + message);
    }
}`,
    keyPoints: [
      "Encapsulation protects class state using private fields and public accessors.",
      "Polymorphism allows dynamic method dispatch at runtime via vtables.",
      "Interfaces define contracts and support multiple inheritance of type.",
      "Abstract classes can hold state (constructors and fields), whereas interfaces cannot maintain mutable instance state."
    ],
    interviewQuestions: [
      {
        question: "Abstract Class vs Interface in Java 8+?",
        answer: "Abstract classes can have instance variables and constructors and represent 'is-a' relationships. Interfaces represent capabilities ('can-do'), cannot have instance fields or constructors, but can have default and static methods."
      },
      {
        question: "Can we override a static method in Java?",
        answer: "No. Static methods belong to the class, not instances. Defining a static method with the same signature in a subclass results in Method Hiding, resolved at compile-time."
      }
    ],
    practiceQuestions: [
      "Design an Employee hierarchy with FullTimeEmployee and Contractor demonstrating polymorphism."
    ]
  },
  {
    id: "collections",
    category: "Core Java",
    title: "Java Collections Framework & HashMap Internals",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    explanation:
      "The Collections Framework provides high-performance data structures: List (ArrayList, LinkedList), Set (HashSet, TreeSet), and Map (HashMap, ConcurrentHashMap, TreeMap). Understanding HashMap internals is the #1 tested Java interview topic.",
    exampleCode: `Map<String, Integer> freqMap = new HashMap<>();
freqMap.put("java", freqMap.getOrDefault("java", 0) + 1);
freqMap.forEach((k, v) -> System.out.println(k + ": " + v));`,
    keyPoints: [
      "HashMap internal array defaults to capacity 16 with a 0.75 load factor.",
      "Collisions are stored in buckets as linked lists; transformed to Red-Black Trees if bucket size >= 8 (Treeification).",
      "HashSet is internally backed by a HashMap where elements are keys and PRESENT dummy object is the value.",
      "ArrayList expands by 50% (newCapacity = oldCapacity + (oldCapacity >> 1)) when full."
    ],
    interviewQuestions: [
      {
        question: "How does HashMap work internally in Java 8+?",
        answer: "HashMap uses an array of Nodes. put() calculates hash(key.hashCode()) and computes bucket index. If collisions occur, it chains nodes. If a bucket reaches 8 elements and array capacity >= 64, it converts the chain into a balanced Red-Black tree for O(log n) worst-case lookup."
      },
      {
        question: "What is the contract between equals() and hashCode()?",
        answer: "If two objects are equal according to equals(), they MUST have the same hashCode(). If they have the same hashCode(), they are not necessarily equal (hash collision)."
      }
    ],
    practiceQuestions: [
      "Implement a custom LRU Cache using LinkedHashMap.",
      "Find the first non-repeating character in a stream using LinkedHashMap."
    ]
  },
  {
    id: "exceptions",
    category: "Core Java",
    title: "Exception Handling & Resource Management",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    explanation:
      "Throwable divides into Error (serious system errors like OutOfMemoryError) and Exception. Exceptions divide into Checked (must be handled or declared, e.g. IOException, SQLException) and Unchecked (RuntimeException subclasses like NullPointerException).",
    exampleCode: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
} catch (IOException ex) {
    logger.error("Failed to read file", ex);
}`,
    keyPoints: [
      "Checked exceptions are verified at compile-time; Unchecked represent programming bugs.",
      "try-with-resources automatically closes objects implementing AutoCloseable.",
      "finally blocks always execute, except when System.exit(0) is called or JVM crashes.",
      "Never swallow exceptions with an empty catch block in production code."
    ],
    interviewQuestions: [
      {
        question: "Checked vs Unchecked Exceptions?",
        answer: "Checked exceptions inherit from Exception (excluding RuntimeException) and must be handled via try-catch or declared with throws. Unchecked exceptions inherit from RuntimeException and represent runtime bugs like NPE or IndexOutOfBounds."
      }
    ],
    practiceQuestions: [
      "Create a custom checked exception 'InsufficientBalanceException' with error codes."
    ]
  },
  {
    id: "generics-lambdas-streams",
    category: "Core Java",
    title: "Generics, Lambda Expressions & Stream API",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    explanation:
      "Java 8 introduced functional programming: Functional Interfaces (@FunctionalInterface), Lambdas (arrow syntax), and Streams. Streams provide declarative, lazy pipelined data processing (filter, map, reduce, collect).",
    exampleCode: `List<String> names = List.of("Alice", "Bob", "Charlie", "David");
List<String> filtered = names.stream()
    .filter(name -> name.length() > 4)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());`,
    keyPoints: [
      "Streams are lazy: intermediate operations are not evaluated until a terminal operation is called.",
      "Generics provide compile-time type safety via Type Erasure.",
      "Core Functional Interfaces: Predicate<T>, Function<T, R>, Consumer<T>, Supplier<T>.",
      "Parallel streams leverage the ForkJoinPool.commonPool()."
    ],
    interviewQuestions: [
      {
        question: "Intermediate vs Terminal operations in Stream API?",
        answer: "Intermediate operations (filter, map, sorted) return a new Stream and are lazily executed. Terminal operations (collect, count, forEach, reduce) trigger the stream pipeline execution and produce a result or side-effect."
      }
    ],
    practiceQuestions: [
      "Given a list of Employees, group them by department and calculate average salary using Collectors.groupingBy."
    ]
  },
  {
    id: "multithreading",
    category: "Core Java",
    title: "Multithreading, Concurrency & Memory Model",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    explanation:
      "Java supports concurrent programming via Threads, the synchronized keyword, volatile variables, and java.util.concurrent (ExecutorService, CountDownLatch, ConcurrentHashMap, ReentrantLock).",
    exampleCode: `ExecutorService executor = Executors.newFixedThreadPool(4);
Future<Integer> future = executor.submit(() -> {
    // Background task
    return 42;
});
executor.shutdown();`,
    keyPoints: [
      "Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
      "volatile guarantees visibility across CPU core caches and prevents instruction reordering.",
      "Deadlock occurs when threads cycle waiting for locked resources (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait).",
      "ExecutorService separates task submission from thread lifecycle management."
    ],
    interviewQuestions: [
      {
        question: "Difference between volatile and synchronized?",
        answer: "volatile guarantees memory visibility so all threads see the latest write directly from main memory without locks, but does NOT guarantee atomicity (e.g. count++ is not atomic). synchronized guarantees both visibility and mutual exclusion (atomicity)."
      }
    ],
    practiceQuestions: [
      "Implement a Thread-Safe Singleton pattern using Double-Checked Locking."
    ]
  },
  {
    id: "jdbc",
    category: "Backend Spring Boot",
    title: "JDBC & Connection Pooling",
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    explanation:
      "JDBC (Java Database Connectivity) is the standard API connecting Java applications with relational databases. PreparedStatement prevents SQL Injection by pre-compiling queries. Connection pooling (e.g., HikariCP) reuses connections to minimize latency.",
    exampleCode: `String sql = "SELECT * FROM users WHERE email = ?";
try (PreparedStatement stmt = conn.prepareStatement(sql)) {
    stmt.setString(1, userEmail);
    ResultSet rs = stmt.executeQuery();
}`,
    keyPoints: [
      "Statement vs PreparedStatement: PreparedStatement pre-compiles SQL and protects against SQL Injection.",
      "Connection pooling reuses persistent TCP/IP database sessions.",
      "Transactions manage commit and rollback across atomic database operations."
    ],
    interviewQuestions: [
      {
        question: "How does PreparedStatement prevent SQL Injection?",
        answer: "PreparedStatement separates query structure from parameters. The database compiles the SQL statement structure first; parameters are then treated strictly as literal values rather than executable SQL fragments."
      }
    ],
    practiceQuestions: [
      "Explain the role of HikariCP in Spring Boot applications."
    ]
  },
  {
    id: "spring-boot",
    category: "Backend Spring Boot",
    title: "Spring Boot, REST APIs & Spring Data JPA",
    difficulty: "Advanced",
    estimatedMinutes: 55,
    explanation:
      "Spring Boot provides auto-configuration, standalone executable jars, embedded web servers (Tomcat), and production-ready metrics (Actuator). Applications follow the Controller -> Service -> Repository layered architecture.",
    exampleCode: `@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}`,
    keyPoints: [
      "Inversion of Control (IoC) and Dependency Injection (DI) decouple classes.",
      "Spring Boot auto-configuration inspects classpath dependencies to configure beans automatically.",
      "Spring Data JPA generates repository implementations dynamically from interface method signatures.",
      "Bean scopes: Singleton (default, one per Spring context), Prototype (new instance per injection), Request, Session."
    ],
    interviewQuestions: [
      {
        question: "What is Spring Boot and how does auto-configuration work?",
        answer: "Spring Boot simplifies Spring development with convention over configuration. @EnableAutoConfiguration scans classpath JARs and uses @Conditional annotations (like @ConditionalOnClass) to automatically configure DataSource, Web servers, and JPA beans."
      },
      {
        question: "Explain the N+1 problem in JPA/Hibernate and how to fix it.",
        answer: "The N+1 problem occurs when fetching an entity with lazy relationships causes 1 query for the parent and N subsequent queries for each child. Fix using JOIN FETCH in JPQL, @EntityGraph, or Hibernate batch fetching."
      }
    ],
    practiceQuestions: [
      "Design a REST API with GET, POST, PUT, DELETE, DTO validation, and Global Exception Handling."
    ]
  }
];