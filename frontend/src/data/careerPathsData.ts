export interface CareerLesson {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  objectives: string[];
  prerequisites: string[];
  explanation: string;
  whyItMatters: string;
  realWorldAnalogy: string;
  stepByStep: string[];
  syntaxReference?: string;
  workedExample: {
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
    dryRunTable?: { step: number; line: string; state: string; note: string }[];
  };
  commonMistakes: string[];
  debuggingTips: string[];
  practiceQuestions: string[];
  assignment: {
    title: string;
    prompt: string;
    starterCode?: string;
    solutionHint: string;
    maxScore: number;
  };
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  interviewRelevance: string;
  summaryNotes: string[];
}

export interface CareerModule {
  id: string;
  title: string;
  stage: number;
  stageName: string;
  description: string;
  lessons: CareerLesson[];
}

export interface CareerPath {
  id: string;
  title: string;
  shortTitle: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  badge: string;
  estimatedWeeks: number;
  hoursPerWeek: number;
  targetRole: string;
  prerequisites: string;
  skills: string[];
  capstoneTitle: string;
  capstoneDescription: string;
  completionCriteria: string[];
  careerReadinessOutcome: string;
  modules: CareerModule[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "sde",
    title: "Software Development Engineer (SDE) Master Track",
    shortTitle: "SDE Track",
    level: "Beginner",
    badge: "Most Popular",
    estimatedWeeks: 12,
    hoursPerWeek: 15,
    targetRole: "Software Engineer / SDE-1 / Graduate Engineer Trainee",
    prerequisites: "Zero prior programming required. High school mathematics and basic computer literacy.",
    skills: ["Programming Fundamentals", "Data Structures & Algorithms", "System Design Basics", "Relational SQL", "OOP & Clean Code", "Operating Systems & Networking"],
    capstoneTitle: "Distributed Rate-Limited URL Analytics Platform",
    capstoneDescription: "Build a production-grade URL shortening and telemetry engine with Redis caching, PostgreSQL persistence, and sub-10ms response time.",
    completionCriteria: [
      "Complete all 6 foundation and core stages",
      "Pass all module knowledge checks with >= 75%",
      "Solve at least 12 algorithmic pattern challenges in the coding playground",
      "Submit and verify the capstone project implementation",
      "Pass the comprehensive final evaluation assessment"
    ],
    careerReadinessOutcome: "Capable of cracking technical coding rounds (DSA medium/hard), explaining core CS principles (DBMS, OS, Networks), and defending clean modular architecture in SDE-1 interviews.",
    modules: [
      {
        id: "sde-m1",
        title: "Stage 1: Computer & Programming Fundamentals (From Scratch)",
        stage: 1,
        stageName: "Computer & Programming Fundamentals",
        description: "Understand how computers execute code, memory storage, logic gates, and write your first error-free programs.",
        lessons: [
          {
            id: "how-computers-work",
            title: "How Computers & Programs Actually Work",
            difficulty: "Beginner",
            estimatedMinutes: 25,
            objectives: [
              "Understand CPU, RAM, and storage hierarchy",
              "Trace how source code transforms into machine bytecode",
              "Learn the role of compilers and interpreters"
            ],
            prerequisites: ["None — absolute beginner"],
            explanation: "A computer is essentially an ultra-fast calculator that executes millions of simple instructions per second. When you write code in languages like Java, Python, or C++, human-readable text is converted into binary machine code (0s and 1s) that the CPU's Arithmetic Logic Unit (ALU) can execute. RAM provides fast, temporary workspace, while disks store persistent files.",
            whyItMatters: "Software engineers must know where data lives (Stack vs Heap, RAM vs Disk) to write fast, memory-efficient programs and prevent crashes.",
            realWorldAnalogy: "Think of the CPU as a master chef, RAM as the kitchen cutting board (quick access, cleared when cooking is done), and hard drive storage as the kitchen pantry (stores everything permanently).",
            stepByStep: [
              "1. Code written in an editor is saved as plain text (.java, .py, .js).",
              "2. The Compiler checks syntax and generates intermediate Bytecode or machine instructions.",
              "3. The OS Loader copies program instructions from Disk into RAM.",
              "4. The CPU Instruction Pointer fetches, decodes, and executes each instruction sequentially.",
              "5. Results are printed to stdout or written back to memory/storage."
            ],
            syntaxReference: "// Terminal execution:\njavac Solution.java  # Compiles to Solution.class\njava Solution        # JVM executes bytecode",
            workedExample: {
              title: "Hello World and Memory Lifecycle",
              description: "A minimal program demonstrating entry-point execution and console output.",
              code: `public class Main {\n    public static void main(String[] args) {\n        String greeting = "Hello, Beam Academy!";\n        int studentCount = 1;\n        System.out.println(greeting + " Student #" + studentCount);\n    }\n}`,
              expectedOutput: "Hello, Beam Academy! Student #1",
              dryRunTable: [
                { step: 1, line: "main entry", state: "args = []", note: "JVM allocates stack frame for main" },
                { step: 2, line: "String greeting", state: "greeting in String Pool, reference on Stack", note: "Allocates immutable string reference" },
                { step: 3, line: "int studentCount = 1", state: "studentCount = 1 on Stack", note: "Primitive 32-bit integer allocated directly on stack" },
                { step: 4, line: "println", state: "Console receives output stream", note: "Standard output writes formatted text" }
              ]
            },
            commonMistakes: [
              "Confusing RAM (volatile, fast memory) with permanent Hard Disk storage.",
              "Thinking code executes simultaneously instead of following sequential control flow.",
              "Ignoring compilation errors and running stale bytecode binaries."
            ],
            debuggingTips: [
              "Always check the line number reported in compiler error messages.",
              "Use print statements (or debugger breakpoints) to inspect variable values at each step."
            ],
            practiceQuestions: [
              "What happens to variables stored in RAM when a computer restarts?",
              "Why do high-level languages like Python and Java need translators before the CPU can run them?"
            ],
            assignment: {
              title: "Trace Memory Execution Flow",
              prompt: "Write down the step-by-step trace of what happens in CPU and RAM when adding two numbers `a = 15` and `b = 25` and storing in `sum`.",
              solutionHint: "CPU fetches instruction -> loads 15 into register R1 -> loads 25 into register R2 -> ALU adds registers -> stores 40 back to RAM address of 'sum'.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "Which component of the computer provides the ultra-fast temporary workspace for active programs?",
                options: ["Hard Disk / SSD", "Random Access Memory (RAM)", "Monitor Display", "Power Supply Unit"],
                correctIndex: 1,
                explanation: "RAM holds the active instructions and program variables for quick access by the CPU during runtime."
              },
              {
                question: "What converts human-readable source code into machine-executable instructions?",
                options: ["Operating System", "Compiler / Interpreter", "Device Driver", "BIOS"],
                correctIndex: 1,
                explanation: "Compilers (like javac/gcc) and Interpreters (like python) translate source code into bytecode or machine code."
              }
            ],
            interviewRelevance: "Interviewers frequently ask about the difference between Stack and Heap memory, and how high-level code interacts with system architecture.",
            summaryNotes: [
              "CPU executes instructions; RAM stores runtime state; Disk stores persistent files.",
              "Code flows sequentially: Fetch -> Decode -> Execute.",
              "Compilers catch syntax errors before runtime; runtime exceptions happen while executing."
            ]
          },
          {
            id: "variables-and-data-types",
            title: "Variables, Primitive Types & Expressions",
            difficulty: "Beginner",
            estimatedMinutes: 30,
            objectives: [
              "Declare and initialize primitive variables (int, float, boolean, char)",
              "Understand bit widths and memory boundaries (overflow/underflow)",
              "Evaluate arithmetic expressions with operator precedence"
            ],
            prerequisites: ["How Computers & Programs Work"],
            explanation: "A variable is a named container in memory with a designated type. In typed programming, declaring a type tells the computer how many bytes of memory to reserve (e.g. 4 bytes for an integer, 1 byte for a boolean). Expressions combine variables, constants, and operators to compute new values.",
            whyItMatters: "Choosing the wrong type leads to integer overflow bugs (like the famous Ariane 5 rocket failure) or wasteful memory consumption in high-scale systems.",
            realWorldAnalogy: "Variables are labeled storage bins of specific sizes. A small egg carton (byte) cannot fit a watermelon (64-bit long integer).",
            stepByStep: [
              "1. Choose an appropriate type based on required range and precision.",
              "2. Choose a descriptive, camelCase identifier (e.g., totalScore, isValid).",
              "3. Assign an initial value using the assignment operator (=).",
              "4. Ensure arithmetic operations don't divide by zero or exceed data type limits."
            ],
            syntaxReference: "int age = 21;          // 32-bit integer (-2B to +2B)\ndouble gpa = 3.85;      // 64-bit IEEE floating point\nboolean active = true;  // 1-bit boolean truth value\nchar grade = 'A';       // 16-bit Unicode character",
            workedExample: {
              title: "Calculating Placement Percentage and Average",
              description: "Demonstrates correct integer division versus double precision arithmetic.",
              code: `public class Grading {\n    public static void main(String[] args) {\n        int dsaScore = 85;\n        int sqlScore = 90;\n        int totalMarks = dsaScore + sqlScore;\n        double average = (double) totalMarks / 2;\n        boolean isPass = average >= 75.0;\n        System.out.println("Average: " + average + ", Passed: " + isPass);\n    }\n}`,
              expectedOutput: "Average: 87.5, Passed: true",
              dryRunTable: [
                { step: 1, line: "int dsaScore = 85", state: "dsaScore: 85", note: "32-bit stack allocation" },
                { step: 2, line: "int sqlScore = 90", state: "sqlScore: 90", note: "32-bit stack allocation" },
                { step: 3, line: "totalMarks = 85 + 90", state: "totalMarks: 175", note: "Addition evaluated" },
                { step: 4, line: "(double) totalMarks / 2", state: "average: 87.5", note: "Explicit cast prevents integer truncation" }
              ]
            },
            commonMistakes: [
              "Integer division truncation: `int a = 5 / 2` results in 2, not 2.5! Must cast to float/double.",
              "Overflow when adding large numbers: `Integer.MAX_VALUE + 1` wraps around to negative values.",
              "Comparing floating point numbers with `==` instead of an epsilon delta tolerance."
            ],
            debuggingTips: [
              "When an average comes out as a round number without decimals, verify you didn't do pure integer division.",
              "Print variable types and values using logging or print statements."
            ],
            practiceQuestions: [
              "What is the result of `10 + 20 * 3` in Java and why?",
              "Why does `byte b = 127; b++;` turn into `-128`?"
            ],
            assignment: {
              title: "Currency Conversion with Proper Types",
              prompt: "Write a program that takes an amount in USD (e.g. 150.50), applies an exchange rate (e.g. 83.25), and computes the total in INR without truncation.",
              solutionHint: "Use double or BigDecimal, multiply amount by rate, and format output to 2 decimal places.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "What is the output of `System.out.println(7 / 2);` in Java?",
                options: ["3.5", "3", "4", "Compilation Error"],
                correctIndex: 1,
                explanation: "Both 7 and 2 are integers, so integer division discards the decimal fraction, yielding 3."
              }
            ],
            interviewRelevance: "Interviewers frequently test type promotion, operator precedence, and floating-point precision caveats.",
            summaryNotes: [
              "Primitives store raw values on the Stack; reference types store addresses.",
              "Integer division discards remainders unless cast to float or double.",
              "Always be conscious of maximum and minimum range boundaries."
            ]
          },
          {
            id: "control-flow-conditions-loops",
            title: "Conditional Logic & Repetition (Loops)",
            difficulty: "Beginner",
            estimatedMinutes: 35,
            objectives: [
              "Construct decision branches using if-else if-else and switch statements",
              "Master while, do-while, and for loop iterations",
              "Implement loop control (break, continue, return)"
            ],
            prerequisites: ["Variables, Primitive Types & Expressions"],
            explanation: "Programs become powerful when they can make decisions and repeat tasks. An `if` statement evaluates a boolean condition to choose which code block to run. Loops (`for`, `while`) repeat a block of code as long as a condition holds true, automating repetitive computation.",
            whyItMatters: "Every software algorithm—from searching an item in a cart to scanning a database index—relies on conditions and loop traversal.",
            realWorldAnalogy: "A traffic light (red = stop, green = go) is conditional logic. Running laps around a track until you complete 10 laps is a loop.",
            stepByStep: [
              "1. Identify the boolean condition that triggers each branch.",
              "2. Place the most specific condition first in if-else ladders.",
              "3. In loops, ensure there is an initialization, a termination check, and an increment step to prevent infinite loops."
            ],
            syntaxReference: "// For loop pattern:\nfor (int i = 0; i < N; i++) {\n    if (i % 2 == 0) continue; // skip evens\n    System.out.println(i);\n}",
            workedExample: {
              title: "Finding the Maximum and Counting Evens in a Range",
              description: "Combines a for loop with conditional checks.",
              code: `public class LoopDemo {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n        }\n        System.out.println("Sum of 1..5 is: " + sum);\n    }\n}`,
              expectedOutput: "Sum of 1..5 is: 15",
              dryRunTable: [
                { step: 1, line: "i = 1", state: "sum = 0 + 1 = 1", note: "First iteration" },
                { step: 2, line: "i = 2", state: "sum = 1 + 2 = 3", note: "Second iteration" },
                { step: 3, line: "i = 3", state: "sum = 3 + 3 = 6", note: "Third iteration" },
                { step: 4, line: "i = 4", state: "sum = 6 + 4 = 10", note: "Fourth iteration" },
                { step: 5, line: "i = 5", state: "sum = 10 + 5 = 15", note: "Fifth iteration" },
                { step: 6, line: "i = 6", state: "i <= 5 is false", note: "Loop terminates cleanly" }
              ]
            },
            commonMistakes: [
              "Off-by-one errors (`i <= N` vs `i < N`).",
              "Forgetting the loop increment statement, causing an infinite loop that freezes the computer.",
              "Using single `=` (assignment) inside an if condition instead of `==` (equality)."
            ],
            debuggingTips: [
              "If a loop hangs indefinitely, check if your counter variable is actually being modified inside the body.",
              "Add a print statement inside the loop printing the iteration index."
            ],
            practiceQuestions: [
              "What is the difference between a `while` loop and a `do-while` loop?",
              "How does `continue` differ from `break` inside a nested loop?"
            ],
            assignment: {
              title: "FizzBuzz Classic Drill",
              prompt: "Write a program that prints numbers from 1 to 20. If divisible by 3, print 'Fizz'; if by 5, 'Buzz'; if both, 'FizzBuzz'.",
              solutionHint: "Check the combined condition `(i % 15 == 0)` first before individual checks for 3 and 5.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "Which loop guarantees that the body of the loop executes at least once?",
                options: ["for loop", "while loop", "do-while loop", "enhanced for loop"],
                correctIndex: 2,
                explanation: "A do-while loop evaluates its condition after running the body, guaranteeing at least one execution."
              }
            ],
            interviewRelevance: "Core interview staple. Interviewers watch closely for off-by-one mistakes and infinite loop vulnerabilities.",
            summaryNotes: [
              "`if-else` provides branching logic; `switch` is optimal for multi-value discrete cases.",
              "`for` loops are best when iteration count is known; `while` loops when looping on a state condition.",
              "Always ensure termination condition is reachable."
            ]
          }
        ]
      },
      {
        id: "sde-m2",
        title: "Stage 2: Programming Proficiency & Object-Oriented Design",
        stage: 2,
        stageName: "Programming Proficiency & OOP",
        description: "Master modular functions, Encapsulation, Inheritance, Polymorphism, Abstraction, Exception Handling, and Complexity Analysis.",
        lessons: [
          {
            id: "functions-and-modular-code",
            title: "Functions, Scope & Call Stack Mechanics",
            difficulty: "Beginner",
            estimatedMinutes: 30,
            objectives: [
              "Define modular functions with parameters and return types",
              "Understand pass-by-value semantics and variable scope",
              "Trace execution through the runtime Call Stack"
            ],
            prerequisites: ["Conditional Logic & Repetition"],
            explanation: "Functions (methods) divide complex software into small, single-responsibility building blocks. When a function is called, the runtime pushes a new Stack Frame containing its local parameters onto the Call Stack. When it finishes and returns, its stack frame is popped off.",
            whyItMatters: "Writing reusable functions eliminates duplication (DRY principle), enables unit testing, and makes large production systems maintainable.",
            realWorldAnalogy: "Like asking a specialist subcontractor to tile a floor: you give them materials (parameters), they do the work, and return the completed job (return value).",
            stepByStep: [
              "1. Choose a clear verb-based name (e.g., calculateTax, findMax).",
              "2. Define the input parameter types and the output return type.",
              "3. Ensure the function does exactly one cohesive task.",
              "4. Return the computed result."
            ],
            syntaxReference: "public static int add(int a, int b) {\n    return a + b;\n}",
            workedExample: {
              title: "Factorial with Call Stack Trace",
              description: "Computing factorial iteratively and showing stack discipline.",
              code: `public class MathUtils {\n    public static long factorial(int n) {\n        if (n <= 1) return 1;\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n    public static void main(String[] args) {\n        System.out.println("5! = " + factorial(5));\n    }\n}`,
              expectedOutput: "5! = 120",
              dryRunTable: [
                { step: 1, line: "main calls factorial(5)", state: "Stack frame created with n = 5", note: "Control transfers to factorial" },
                { step: 2, line: "loop multiplies 1 * 2 * 3 * 4 * 5", state: "result = 120", note: "Iterative accumulation" },
                { step: 3, line: "return 120", state: "Stack frame popped", note: "Value returned to main caller" }
              ]
            },
            commonMistakes: [
              "Thinking Java passes objects by reference. Java is strictly Pass-by-Value (it passes a copy of the reference address!).",
              "Writing 'god functions' that do 5 different unrelated tasks.",
              "Modifying global state unexpectedly from inside a helper function."
            ],
            debuggingTips: [
              "Examine the stack trace when an exception occurs to identify exactly which function called which."
            ],
            practiceQuestions: [
              "What is Stack Overflow Error and how does it happen in recursive functions?",
              "What does the `void` return type indicate?"
            ],
            assignment: {
              title: "Modular Geometry Calculator",
              prompt: "Create three methods: `circleArea(double radius)`, `rectangleArea(double w, double h)`, and `isRightTriangle(double a, double b, double c)`.",
              solutionHint: "Use `Math.PI * r * r` and `Math.pow(a, 2) + Math.pow(b, 2) == Math.pow(c, 2)`.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "In Java, how are arguments passed to methods?",
                options: ["Strictly Pass-by-Reference", "Strictly Pass-by-Value", "Pass-by-Pointer", "Depends on type"],
                correctIndex: 1,
                explanation: "Java is strictly pass-by-value. Primitives pass a copy of the value; objects pass a copy of the reference."
              }
            ],
            interviewRelevance: "Common discussion topic in first-round technical screenings to verify fundamental software construction skills.",
            summaryNotes: [
              "Functions provide encapsulation of logic and clean testing boundaries.",
              "Each function call creates a new stack frame on the call stack.",
              "Keep functions small, pure, and focused on a single responsibility."
            ]
          },
          {
            id: "oop-four-pillars",
            title: "The Four Pillars of Object-Oriented Programming (OOP)",
            difficulty: "Intermediate",
            estimatedMinutes: 40,
            objectives: [
              "Master Encapsulation with private fields and public accessors",
              "Implement Inheritance to model hierarchical relationships",
              "Apply Runtime & Compile-time Polymorphism",
              "Design clean Abstraction using Interfaces and Abstract Classes"
            ],
            prerequisites: ["Functions, Scope & Call Stack Mechanics"],
            explanation: "OOP models software after real-world domain entities. Encapsulation shields internal state. Inheritance promotes code reuse. Polymorphism allows a single interface to control different underlying implementations. Abstraction hides complexity behind clean contracts.",
            whyItMatters: "Enterprise software architectures (Spring Boot, Android, iOS, large-scale systems) are organized around clean OOP abstractions.",
            realWorldAnalogy: "Driving a car: The accelerator pedal is an abstract interface. You don't need to know the fuel injection mechanics (encapsulation) to drive a gas, hybrid, or electric vehicle (polymorphism).",
            stepByStep: [
              "1. Encapsulate entity fields as private and provide validated getters/setters.",
              "2. Define interfaces for capabilities (e.g., PaymentProcessor, Repository).",
              "3. Implement concrete classes that fulfill the interface.",
              "4. Program to the interface, not the concrete implementation."
            ],
            syntaxReference: "public interface PaymentService {\n    boolean processPayment(double amount);\n}\npublic class StripePayment implements PaymentService {\n    @Override\n    public boolean processPayment(double amount) { return true; }\n}",
            workedExample: {
              title: "Payment Gateway Polymorphism",
              description: "Demonstrating how polymorphism allows swapping payment providers seamlessly.",
              code: `interface Payment { void pay(double amt); }\nclass CardPayment implements Payment {\n    public void pay(double amt) { System.out.println("Paid $" + amt + " with Credit Card"); }\n}\nclass UpiPayment implements Payment {\n    public void pay(double amt) { System.out.println("Paid $" + amt + " with UPI"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Payment p = new UpiPayment(); // Polymorphic dispatch\n        p.pay(500.0);\n    }\n}`,
              expectedOutput: "Paid $500.0 with UPI",
              dryRunTable: [
                { step: 1, line: "Payment p = new UpiPayment()", state: "p points to UpiPayment instance in Heap", note: "Interface reference holding concrete instance" },
                { step: 2, line: "p.pay(500.0)", state: "Invokes UpiPayment's pay method via vtable", note: "Dynamic method dispatch executes subclass implementation" }
              ]
            },
            commonMistakes: [
              "Making fields public and violating encapsulation.",
              "Overusing deep inheritance hierarchies instead of object composition (Prefer composition over inheritance!).",
              "Confusing method overloading (compile-time) with method overriding (runtime)."
            ],
            debuggingTips: [
              "Check `@Override` annotations to ensure subclass methods match superclass signatures exactly."
            ],
            practiceQuestions: [
              "What is the difference between an Abstract Class and an Interface in Java 8+?",
              "Why should you prefer Composition over Inheritance?"
            ],
            assignment: {
              title: "Bank Account Domain Model",
              prompt: "Implement an abstract `Account` class with `deposit` and abstract `withdraw`. Create `SavingsAccount` (minimum balance limit) and `CheckingAccount` (overdraft protection).",
              solutionHint: "Enforce balance checks inside `withdraw` and throw an `InsufficientFundsException` if limits are exceeded.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "Which OOP principle hides internal representation and protects data integrity?",
                options: ["Polymorphism", "Inheritance", "Encapsulation", "Compilation"],
                correctIndex: 2,
                explanation: "Encapsulation restricts direct access to an object's components, bundling data with methods that operate on it."
              }
            ],
            interviewRelevance: "Mandatory in every software interview. Candidates must articulate the trade-offs of all four pillars with practical examples.",
            summaryNotes: [
              "Encapsulation protects invariants; Abstraction reduces complexity.",
              "Polymorphism enables plug-and-play architecture.",
              "Always prefer composition and interface contracts over tight class coupling."
            ]
          }
        ]
      },
      {
        id: "sde-m3",
        title: "Stage 3: Data Structures & Algorithmic Patterns",
        stage: 3,
        stageName: "Data Structures & Algorithms",
        description: "Master high-frequency interview patterns: Two Pointers, Sliding Window, Hashing, Linked Lists, Trees, Graphs, and Dynamic Programming.",
        lessons: [
          {
            id: "two-pointers-and-sliding-window",
            title: "Two Pointers & Sliding Window Patterns",
            difficulty: "Intermediate",
            estimatedMinutes: 45,
            objectives: [
              "Identify when a problem can be reduced from O(N²) to O(N) using two pointers",
              "Implement fixed and variable-size sliding windows",
              "Solve classic interview problems like Two Sum (sorted) and Longest Substring"
            ],
            prerequisites: ["Programming Proficiency & OOP"],
            explanation: "Instead of nested loops testing every pair O(N²), two pointers use directional movement (one from left, one from right, or fast/slow) to discard invalid search spaces in O(N) time. The sliding window pattern maintains a running window over an array or string, expanding right and shrinking left based on constraints.",
            whyItMatters: "These two patterns account for over 35% of array and string interview questions asked by top tech firms.",
            realWorldAnalogy: "Like reading a wide measuring tape where one person holds the start and another moves the slider to measure valid spans.",
            stepByStep: [
              "1. Two Pointers: Sort array if order doesn't matter. Place pointers at `left = 0`, `right = N - 1`.",
              "2. If `sum < target`, increment `left` to increase sum.",
              "3. If `sum > target`, decrement `right` to decrease sum.",
              "4. Sliding Window: Expand `right` until constraint is violated, then shrink `left` while maintaining running window state."
            ],
            syntaxReference: "int left = 0, right = arr.length - 1;\nwhile (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}",
            workedExample: {
              title: "Two Sum on Sorted Array (O(N) time, O(1) space)",
              description: "Optimal two-pointer solution discarding halves of the search space.",
              code: `public class TwoPointerDemo {\n    public static int[] twoSumSorted(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int cur = nums[l] + nums[r];\n            if (cur == target) return new int[]{l, r};\n            if (cur < target) l++;\n            else r--;\n        }\n        return new int[]{-1, -1};\n    }\n    public static void main(String[] args) {\n        int[] ans = twoSumSorted(new int[]{2, 7, 11, 15}, 9);\n        System.out.println("Indices: " + ans[0] + ", " + ans[1]);\n    }\n}`,
              expectedOutput: "Indices: 0, 1",
              dryRunTable: [
                { step: 1, line: "l=0, r=3", state: "nums[0]=2, nums[3]=15, sum=17", note: "17 > 9 -> decrement r to 2" },
                { step: 2, line: "l=0, r=2", state: "nums[0]=2, nums[2]=11, sum=13", note: "13 > 9 -> decrement r to 1" },
                { step: 3, line: "l=0, r=1", state: "nums[0]=2, nums[1]=7, sum=9", note: "9 == target -> match found! Returns [0, 1]" }
              ]
            },
            commonMistakes: [
              "Using two pointers on an unsorted array where values are not monotonically increasing/decreasing.",
              "Failing to increment/decrement pointers inside the while loop, causing infinite execution.",
              "Forgetting to update the running window state when shrinking `left` in sliding window problems."
            ],
            debuggingTips: [
              "Print the window bounds `[left, right]` and running window map/sum at every iteration."
            ],
            practiceQuestions: [
              "How would you find the maximum sum subarray of fixed size K?",
              "Explain how the Dutch National Flag problem uses 3 pointers."
            ],
            assignment: {
              title: "Longest Substring Without Repeating Characters",
              prompt: "Given a string `s`, find the length of the longest substring without repeating characters using a sliding window and hash map.",
              solutionHint: "Store the last seen index of each character. When a duplicate is seen, jump `left` to `Math.max(left, lastSeenIndex + 1)`.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "What is the time complexity of the two-pointer technique on an already sorted array of length N?",
                options: ["O(N²)", "O(N log N)", "O(N)", "O(1)"],
                correctIndex: 2,
                explanation: "Each pointer moves at most N steps, making the total operations bounded linearly by O(N)."
              }
            ],
            interviewRelevance: "Essential benchmark pattern tested in online assessments and whiteboard interviews across FAANG and top startups.",
            summaryNotes: [
              "Two Pointers reduce search space in O(N) time and O(1) space on sorted arrays.",
              "Sliding Window maintains continuous subarray state without re-evaluating elements.",
              "Master this pattern before moving into trees and graph traversals."
            ]
          }
        ]
      },
      {
        id: "sde-m4",
        title: "Stage 4: Core Computer Science Foundations",
        stage: 4,
        stageName: "Core Computer Science",
        description: "DBMS, SQL Query Optimization, Operating Systems, Process Concurrency, Computer Networks, and HTTP/REST protocols.",
        lessons: [
          {
            id: "relational-databases-and-sql",
            title: "Relational DBMS, Indexing & Query Execution",
            difficulty: "Intermediate",
            estimatedMinutes: 40,
            objectives: [
              "Understand Relational Schema Design and Normalization (1NF, 2NF, 3NF)",
              "Master SQL Joins, Aggregations, and Window Functions",
              "Understand B-Tree Indexes and query optimization using EXPLAIN"
            ],
            prerequisites: ["Computer & Programming Fundamentals"],
            explanation: "Relational database systems (MySQL, PostgreSQL) guarantee ACID (Atomicity, Consistency, Isolation, Durability) properties for critical business transactions. SQL queries are declaratively planned by the database optimizer, which uses B-Tree indexes on disk pages to execute queries in logarithmic time rather than scanning millions of rows.",
            whyItMatters: "90% of real-world enterprise applications are backed by relational databases. Poor queries and missing indexes cause server downtime and latency spikes.",
            realWorldAnalogy: "A database table is like a library with millions of books. A B-Tree index is like the alphabetical library catalog: instead of scanning every shelf, you look up the shelf location directly.",
            stepByStep: [
              "1. Logical Query Processing Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.",
              "2. Always create composite indexes with equality columns first, followed by range columns.",
              "3. Use transactions (`BEGIN...COMMIT`) to ensure all operations succeed or all rollback together."
            ],
            syntaxReference: "SELECT u.name, COUNT(t.id) AS completed_topics\nFROM users u\nJOIN topic_completions t ON u.id = t.user_id\nWHERE t.completed = true\nGROUP BY u.id, u.name\nHAVING COUNT(t.id) >= 5\nORDER BY completed_topics DESC;\n\nEXPLAIN SELECT * FROM users WHERE email = 'test@example.com';",
            workedExample: {
              title: "Indexing and Avoiding Full Table Scans",
              description: "Shows how a B-Tree index turns an O(N) table scan into an O(log N) index seek.",
              code: `-- Creating table with indexing\nCREATE TABLE students (\n    id BIGINT PRIMARY KEY AUTO_INCREMENT,\n    email VARCHAR(255) NOT NULL UNIQUE,\n    target_role VARCHAR(100),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    INDEX idx_target_role (target_role)\n);\n\n-- Fast B-Tree range lookup:\nSELECT * FROM students WHERE target_role = 'SDE' ORDER BY created_at DESC;`,
              expectedOutput: "Query executed in 1.2ms (Using index condition)",
              dryRunTable: [
                { step: 1, line: "FROM students", state: "Engine opens students table", note: "Accesses table metadata" },
                { step: 2, line: "WHERE target_role = 'SDE'", state: "Engine checks idx_target_role", note: "B-Tree index seek directly finds matching leaf nodes" },
                { step: 3, line: "SELECT rows", state: "Retrieves matched records", note: "Skips non-matching records on disk entirely" }
              ]
            },
            commonMistakes: [
              "Applying functions on indexed columns (e.g. `WHERE YEAR(created_at) = 2026`), which disables the B-Tree index and forces a full table scan!",
              "Confusing `WHERE` (filters rows before aggregation) with `HAVING` (filters groups after aggregation).",
              "Using `SELECT *` in production instead of querying only required columns."
            ],
            debuggingTips: [
              "Run `EXPLAIN ANALYZE <query>` to inspect whether the database uses `type: ref/range` (good) or `type: ALL` (bad full table scan)."
            ],
            practiceQuestions: [
              "What is the difference between Clustered Index and Non-Clustered Secondary Index?",
              "What are the 4 ACID properties and why are they vital in financial transactions?"
            ],
            assignment: {
              title: "Write an Analytics Query with Aggregation",
              prompt: "Write a SQL query to find the top 3 users with the highest average score across aptitude attempts who have completed at least 2 attempts.",
              solutionHint: "Use `SELECT user_id, AVG(score) FROM aptitude_attempts GROUP BY user_id HAVING COUNT(*) >= 2 ORDER BY AVG(score) DESC LIMIT 3;`",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "In what logical order does a SQL database engine evaluate query clauses?",
                options: [
                  "SELECT -> FROM -> WHERE -> GROUP BY",
                  "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
                  "WHERE -> FROM -> SELECT -> ORDER BY",
                  "FROM -> SELECT -> WHERE -> HAVING"
                ],
                correctIndex: 1,
                explanation: "The engine first identifies the data source (FROM), filters rows (WHERE), groups them (GROUP BY), filters groups (HAVING), extracts columns (SELECT), and finally orders (ORDER BY)."
              }
            ],
            interviewRelevance: "Frequently tested in technical interview rounds. Every candidate is expected to write error-free JOINs and explain index mechanics.",
            summaryNotes: [
              "ACID transactions protect data consistency across crashes.",
              "B-Tree indexes speed up lookups from O(N) to O(log N).",
              "Never apply functions to indexed columns in WHERE clauses."
            ]
          }
        ]
      },
      {
        id: "sde-m5",
        title: "Stage 5: Practical Development & REST Architecture",
        stage: 5,
        stageName: "Practical Development",
        description: "Build robust REST APIs, 3-tier enterprise architecture, JWT authentication, and automated integration testing.",
        lessons: [
          {
            id: "rest-apis-and-architecture",
            title: "RESTful API Design & Enterprise Layered Architecture",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: [
              "Design resource-oriented RESTful endpoints with standard HTTP status codes",
              "Implement clean 3-tier architecture: Controller, Service, Repository",
              "Handle exceptions globally and enforce input validation"
            ],
            prerequisites: ["Core Computer Science Foundations"],
            explanation: "REST (Representational State Transfer) is the universal communication protocol between web clients and backend servers. An enterprise backend organizes code into three distinct layers: the Controller layer (HTTP routing and request parsing), the Service layer (pure business logic and transactions), and the Repository layer (database CRUD operations).",
            whyItMatters: "Adhering to REST conventions and layered separation makes systems maintainable, secure against injection, and scalable to millions of users.",
            realWorldAnalogy: "Like a restaurant: The Controller is the waiter (takes the order, validates menu items), the Service is the kitchen chef (prepares the meal according to business rules), and the Repository is the refrigerator pantry (stores raw ingredients).",
            stepByStep: [
              "1. Choose nouns for resources (`/api/users`, `/api/certificates`).",
              "2. Use HTTP methods for actions: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).",
              "3. Return correct HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Error).",
              "4. Never let database entities leak directly into the API response; use clean Data Transfer Objects (DTOs)."
            ],
            syntaxReference: "@RestController\n@RequestMapping(\"/api/courses\")\npublic class CourseController {\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<CourseDto> getCourse(@PathVariable String id) {\n        return ResponseEntity.ok(courseService.findById(id));\n    }\n}",
            workedExample: {
              title: "3-Tier Spring Boot Endpoint",
              description: "A clean controller endpoint calling a validated service layer.",
              code: `@RestController\n@RequestMapping("/api/tasks")\npublic class TaskController {\n    private final TaskService taskService;\n    public TaskController(TaskService service) { this.taskService = service; }\n\n    @PostMapping\n    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody CreateTaskRequest req) {\n        TaskDto created = taskService.createTask(req);\n        return ResponseEntity.status(HttpStatus.CREATED).body(created);\n    }\n}`,
              expectedOutput: "HTTP 201 Created with JSON TaskDto payload",
              dryRunTable: [
                { step: 1, line: "HTTP POST /api/tasks", state: "DispatcherServlet matches URL pattern", note: "Deserializes incoming JSON into CreateTaskRequest" },
                { step: 2, line: "@Valid validation", state: "Validates field constraints", note: "Fails early with 400 if fields are blank" },
                { step: 3, line: "taskService.createTask", state: "Service executes business logic", note: "Saves entity via taskRepository and returns DTO" }
              ]
            },
            commonMistakes: [
              "Using verbs in URLs (e.g. `/api/getUserById` instead of `GET /api/users/{id}`).",
              "Returning HTTP 200 OK with an error message in the JSON body instead of proper 4xx/5xx status codes.",
              "Putting database queries directly inside Controller methods."
            ],
            debuggingTips: [
              "Use browser developer tools Network tab or cURL to inspect raw HTTP request and response headers."
            ],
            practiceQuestions: [
              "What is the difference between PUT and PATCH in RESTful design?",
              "What is Idempotence and which HTTP methods are idempotent?"
            ],
            assignment: {
              title: "Design a RESTful Resource Endpoint Schema",
              prompt: "Design the complete RESTful URL, HTTP methods, status codes, and JSON payload structures for a university Assignment Submission system.",
              solutionHint: "`GET /assignments`, `POST /assignments/{id}/submissions`, `GET /submissions/{id}`, `PATCH /submissions/{id}/grade`.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "Which HTTP status code should be returned when a client successfully creates a new resource?",
                options: ["200 OK", "201 Created", "204 No Content", "302 Found"],
                correctIndex: 1,
                explanation: "HTTP 201 Created explicitly signals that a new resource has been created on the server."
              }
            ],
            interviewRelevance: "Standard practical design question in every backend and full-stack software engineering interview.",
            summaryNotes: [
              "REST uses standard HTTP verbs on plural noun resources.",
              "Strictly separate Controller (HTTP), Service (Business Logic), and Repository (Data Access).",
              "Use DTOs to decouple client contracts from internal database tables."
            ]
          }
        ]
      },
      {
        id: "sde-m6",
        title: "Stage 6: Professional Readiness & Interview Mastery",
        stage: 6,
        stageName: "Professional Readiness",
        description: "Portfolio capstone verification, ATS resume craftsmanship, STAR-method behavioral response building, and mock interview practice.",
        lessons: [
          {
            id: "system-design-and-portfolio-capstone",
            title: "System Architecture & Portfolio Capstone Delivery",
            difficulty: "Advanced",
            estimatedMinutes: 45,
            objectives: [
              "Architect a scalable distributed application with caching and database indexing",
              "Structure technical portfolio projects with architectural diagrams and README documentation",
              "Present projects using the STAR (Situation, Task, Action, Result) interview methodology"
            ],
            prerequisites: ["Practical Development & REST Architecture"],
            explanation: "In SDE-1 interviews, your portfolio projects prove you can build real, resilient systems rather than just solve theoretical problems. You must be able to defend every design choice: why you chose relational MySQL over NoSQL, how you handled caching with Redis, how you secured endpoints with JWT, and what trade-offs you made.",
            whyItMatters: "Hiring managers look for candidates who understand production engineering: monitoring, error handling, database performance, and clear communication.",
            realWorldAnalogy: "Like presenting an architectural blueprint of a bridge to city planners: you show the load-bearing supports (database), traffic lanes (caching), and safety barriers (security).",
            stepByStep: [
              "1. Define Functional and Non-Functional Requirements (QPS, latency, data durability).",
              "2. Sketch High-Level Architecture (Client -> Gateway -> Service -> Cache -> Database).",
              "3. Implement core business logic with automated test coverage.",
              "4. Benchmark performance and document key metrics in a production-ready README.",
              "5. Practice defending architectural trade-offs using the STAR method."
            ],
            syntaxReference: "// STAR Method Formula:\nSituation: High campus placement drive volume caused portal slowdown.\nTask: Architect a sub-10ms response time system for 10,000 concurrent students.\nAction: Implemented 3-tier Spring Boot REST API, Redis caching, and indexed MySQL schema.\nResult: Achieved 99.9% uptime, reduced query latency by 72%, and qualified for Beam Academy Certification.",
            workedExample: {
              title: "Explaining the Beam Academy Capstone in an Interview",
              description: "Structured 2-minute architectural explanation.",
              code: `// Capstone Architecture Summary:\nClient: React 19 + TypeScript + Vite (Glassmorphic SPA)\nAPI Gateway / Server: Spring Boot 3 + Spring Security (Stateless JWT + BCrypt)\nPersistence: MySQL 8 with B-Tree indexes + Hibernate ORM\nTelemetry: Actuator health endpoints + Real-time progress computation\nCertification: Cryptographic SHA-256 verifiable credentials`,
              expectedOutput: "Clear, impressive technical interview explanation",
              dryRunTable: [
                { step: 1, line: "State Problem", state: "College students need verifiable curriculum from zero", note: "Clearly states the domain challenge" },
                { step: 2, line: "Explain Tech Choices", state: "Spring Boot + React + MySQL", note: "Justifies enterprise stack choice" },
                { step: 3, line: "Highlight Optimization", state: "Server-side eligibility verification & local AI fallback", note: "Demonstrates defensive engineering" }
              ]
            },
            commonMistakes: [
              "Listing tutorials as original portfolio projects without understanding their architecture.",
              "Unable to explain how the database tables relate to each other.",
              "Rambling in interview answers instead of following the structured STAR framework."
            ],
            debuggingTips: [
              "Record yourself giving a 90-second elevator pitch about your capstone project and review clarity."
            ],
            practiceQuestions: [
              "Why did you choose MySQL over MongoDB for your platform?",
              "How would your system scale if traffic increased 100x?"
            ],
            assignment: {
              title: "Complete Capstone Documentation & Submission",
              prompt: "Submit your capstone repository URL, architecture summary, and verify you meet all Beam Academy Certification criteria.",
              solutionHint: "Ensure your project README includes problem statement, tech stack, architecture diagram, setup steps, and test instructions.",
              maxScore: 20
            },
            knowledgeCheck: [
              {
                question: "What does the STAR method stand for in technical and behavioral interviews?",
                options: [
                  "Software, Testing, Architecture, Review",
                  "Situation, Task, Action, Result",
                  "System, Tooling, Algorithm, Runtime",
                  "Scope, Timeline, Allocation, Release"
                ],
                correctIndex: 1,
                explanation: "STAR stands for Situation, Task, Action, and Result—the gold standard structure for answering interview questions."
              }
            ],
            interviewRelevance: "This is the final phase of placement preparation that turns technical skills into job offers.",
            summaryNotes: [
              "Every technical claim on your resume must be backed by real code and working architecture.",
              "Use STAR structure to give concise, metric-driven answers.",
              "Complete your capstone and earn your verifiable Beam Academy Certificate!"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "java",
    title: "Java Backend Developer Enterprise Track",
    shortTitle: "Java Backend",
    level: "Beginner",
    badge: "Enterprise Standard",
    estimatedWeeks: 10,
    hoursPerWeek: 14,
    targetRole: "Java Developer / Backend Engineer / Spring Boot Developer",
    prerequisites: "Basic programming logic or absolute beginner willing to learn from fundamentals.",
    skills: ["Java 17/21 Core", "JVM Memory Model & GC", "Collections Framework", "Multithreading & Concurrency", "Spring Boot 3 REST", "Spring Data JPA & Hibernate", "MySQL Optimization"],
    capstoneTitle: "High-Throughput E-Commerce Order & Inventory Engine",
    capstoneDescription: "Build a distributed inventory management service with optimistic locking, ACID transactions, and Redis distributed caching.",
    completionCriteria: [
      "Complete all 11 Java Core & Spring modules",
      "Pass Java OOP and Concurrency assessments",
      "Solve at least 8 Java algorithmic drills",
      "Submit inventory engine capstone implementation"
    ],
    careerReadinessOutcome: "Prepared for enterprise backend roles at banks, fintechs, and product MNCs requiring deep Java and Spring Boot mastery.",
    modules: [
      {
        id: "java-m1",
        title: "Module 1: JVM Internals, Memory Model & Collections",
        stage: 1,
        stageName: "Java Fundamentals & JVM Internals",
        description: "Deep dive into ClassLoaders, JVM Stack vs Heap, Garbage Collection algorithms, and HashMap internal hashing.",
        lessons: [
          {
            id: "jvm-memory-and-gc",
            title: "JVM Memory Architecture: Stack, Heap & Garbage Collection",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: [
              "Distinguish between Stack frames, Young Generation Heap, and Old Generation Heap",
              "Understand GC roots, Mark-and-Sweep, and Stop-The-World pauses",
              "Identify memory leaks in long-running Java applications"
            ],
            prerequisites: ["Java Basics"],
            explanation: "The Java Virtual Machine organizes memory into the Call Stack (thread-private, stores primitive variables and object reference pointers) and the Heap (shared among all threads, holds actual object instances). The Garbage Collector automatically reclaims heap memory occupied by unreachable objects, eliminating manual memory deallocation bugs.",
            whyItMatters: "High-throughput Java servers can experience latency spikes if GC pauses are poorly tuned or if memory leaks cause OutOfMemoryError.",
            realWorldAnalogy: "Like an office with private desks (Call Stacks) and a shared filing archive (Heap). A cleaning crew (Garbage Collector) regularly shreds documents that nobody's desk has a reference to.",
            stepByStep: [
              "1. Thread creation allocates a fixed-size Call Stack (default 1MB).",
              "2. `new Object()` creates an instance in Eden space of Young Gen Heap.",
              "3. Surviving objects get promoted to Survivor spaces (S0/S1) and eventually Tenured Old Gen.",
              "4. Minor GC clears Eden space quickly; Major/Full GC scans Old Gen."
            ],
            syntaxReference: "// Inspect memory at runtime:\nRuntime rt = Runtime.getRuntime();\nlong freeMem = rt.freeMemory();\nlong totalMem = rt.totalMemory();",
            workedExample: {
              title: "Demonstrating Object References vs Primitives",
              description: "Shows how stack holds references pointing to heap instances.",
              code: `public class MemoryDemo {\n    static class Node { int val; Node(int v) { this.val = v; } }\n    public static void main(String[] args) {\n        int x = 42; // Stack\n        Node n = new Node(100); // n on Stack, Node(100) on Heap\n        System.out.println("x=" + x + ", n.val=" + n.val);\n    }\n}`,
              expectedOutput: "x=42, n.val=100",
              dryRunTable: [
                { step: 1, line: "int x = 42", state: "Stack holds raw int 42", note: "No heap allocation" },
                { step: 2, line: "new Node(100)", state: "Heap allocates Node object", note: "Returns 64-bit reference address" },
                { step: 3, line: "Node n = ...", state: "Stack variable n stores heap reference", note: "Points from stack to heap" }
              ]
            },
            commonMistakes: [
              "Holding static collections that grow unbounded, causing memory leaks.",
              "Assuming `System.gc()` forces immediate garbage collection (it is only a hint to the JVM!)."
            ],
            debuggingTips: [
              "Use jconsole, VisualVM, or Eclipse Memory Analyzer (MAT) to analyze heap dumps."
            ],
            practiceQuestions: [
              "What is the difference between Minor GC and Full GC?",
              "Why can a static ArrayList cause a memory leak in Java?"
            ],
            assignment: {
              title: "Trace Object Allocation Lifecycle",
              prompt: "Explain how objects move from Eden space through Survivor spaces to the Old Generation in the HotSpot JVM.",
              solutionHint: "Objects are born in Eden. Surviving objects get copied to S0/S1 with an incremented age threshold (default 15) before tenuring.",
              maxScore: 10
            },
            knowledgeCheck: [
              {
                question: "Where are local primitive variables stored in Java?",
                options: ["Metaspace", "Call Stack", "Heap Memory", "PermGen"],
                correctIndex: 1,
                explanation: "Local variables and method parameters reside directly on their thread's Call Stack frame."
              }
            ],
            interviewRelevance: "Top questions in Amazon, Morgan Stanley, and Goldman Sachs Java engineering interviews.",
            summaryNotes: [
              "Stack is fast and thread-isolated; Heap is shared and GC-managed.",
              "Young Gen holds short-lived objects; Old Gen holds long-lived survivors.",
              "Memory leaks occur when unused objects remain reachable from GC roots."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python Developer & Modern Automation Track",
    shortTitle: "Python Developer",
    level: "Beginner",
    badge: "Versatile Standard",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "Python Developer / Backend Python Engineer / Automation Engineer",
    prerequisites: "None. Perfect for absolute beginners.",
    skills: ["Python 3.12 Syntax", "Data Structures (Lists, Dicts, Sets)", "OOP in Python", "FastAPI & REST", "Decorators & Generators", "SQLAlchemy ORM", "Pytest & Automation"],
    capstoneTitle: "Async Web Scraper & Real-Time Alert Engine",
    capstoneDescription: "Build an asynchronous price-tracking and notification platform using FastAPI, BeautifulSoup, and SQLite.",
    completionCriteria: ["Complete Python fundamentals and OOP modules", "Build 1 FastAPI backend service", "Pass Python mastery quiz"],
    careerReadinessOutcome: "Ready for Python backend developer, script automation, and junior data engineering roles.",
    modules: [
      {
        id: "py-m1",
        title: "Module 1: Python Fundamentals & Data Structures",
        stage: 1,
        stageName: "Python Core",
        description: "Variables, list comprehensions, dictionaries, sets, and idiomatic Pythonic patterns.",
        lessons: [
          {
            id: "python-basics-and-lists",
            title: "Python Basics, Dynamic Typing & Comprehensions",
            difficulty: "Beginner",
            estimatedMinutes: 25,
            objectives: ["Understand dynamic typing in Python", "Master list comprehensions and dictionaries", "Use built-in functions effectively"],
            prerequisites: ["None"],
            explanation: "Python is an interpreted, high-level language with clean, readable syntax. In Python, everything is an object, and variables are dynamic pointers to objects in memory.",
            whyItMatters: "Python's rapid development speed makes it the premier language for startups, data science, and backend APIs.",
            realWorldAnalogy: "Like speaking plain English to your computer instead of writing verbose boilerplate.",
            stepByStep: ["1. Write clean PEP 8 compliant code.", "2. Use list comprehensions for concise filtering and mapping.", "3. Leverage dictionary O(1) key lookups."],
            syntaxReference: "squares = [x**2 for x in range(10) if x % 2 == 0]\nlookup = {'alice': 95, 'bob': 88}",
            workedExample: {
              title: "List Comprehension and Dict Processing",
              description: "Filtering and transforming data in 2 lines.",
              code: `scores = {"Alice": 85, "Bob": 92, "Charlie": 78}\nhonors = {k: v for k, v in scores.items() if v >= 80}\nprint("Honors:", honors)`,
              expectedOutput: "Honors: {'Alice': 85, 'Bob': 92}"
            },
            commonMistakes: ["Using mutable default arguments in functions (e.g. `def f(x=[])`)", "Confusing `==` (equality) with `is` (identity)."],
            debuggingTips: ["Use `breakpoint()` or `print(type(x))` to inspect variables dynamically."],
            practiceQuestions: ["Why are tuples immutable while lists are mutable?"],
            assignment: {
              title: "Word Frequency Counter",
              prompt: "Write a function that counts word frequencies in a sentence using a Python dictionary.",
              solutionHint: "Use `.split()` and `dict.get(word, 0) + 1` or `collections.Counter`.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What is the result of `type([])` in Python?", options: ["dict", "list", "tuple", "set"], correctIndex: 1, explanation: "Square brackets define a list object in Python." }],
            interviewRelevance: "Every Python interview tests dictionary operations and comprehension idioms.",
            summaryNotes: ["Python is dynamically typed and garbage collected.", "List comprehensions provide clean data transformation."]
          }
        ]
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Developer (React 19 & TypeScript) Track",
    shortTitle: "Frontend Dev",
    level: "Beginner",
    badge: "UI / UX Mastery",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "Frontend Developer / React Developer / UI Engineer",
    prerequisites: "None. Basic curiosity about web design.",
    skills: ["HTML5 & Semantic Markup", "Modern CSS & Tailwind", "JavaScript ES6+", "TypeScript", "React 19 Hooks & State", "Component Architecture", "Vite & Performance"],
    capstoneTitle: "Interactive SaaS Learning Workspace & Dashboard",
    capstoneDescription: "Build a responsive, accessible React application with dark mode, interactive charts, and glassmorphic UI.",
    completionCriteria: ["Complete React state and hooks modules", "Build 3 interactive UI components", "Pass Frontend evaluation assessment"],
    careerReadinessOutcome: "Ready for frontend developer and React engineer positions with modern portfolio showcases.",
    modules: [
      {
        id: "fe-m1",
        title: "Module 1: Modern React 19 & Component State",
        stage: 1,
        stageName: "React Foundations",
        description: "Components, JSX, unidirectional data flow, useState, useEffect, and custom hooks.",
        lessons: [
          {
            id: "react-components-and-hooks",
            title: "React Components, State & The Virtual DOM",
            difficulty: "Beginner",
            estimatedMinutes: 30,
            objectives: ["Understand JSX and Component trees", "Manage reactive state with useState", "Avoid unnecessary re-renders"],
            prerequisites: ["HTML, CSS & Basic JavaScript"],
            explanation: "React builds user interfaces using composable components. Instead of manipulating the real DOM directly (which is slow), React compares a lightweight Virtual DOM tree and patches only the changed elements.",
            whyItMatters: "React powers modern web platforms (Meta, Netflix, Airbnb, Beam Academy).",
            realWorldAnalogy: "Like building with Lego blocks: each block (component) has its own color and shape, snap together seamlessly, and can be swapped out easily.",
            stepByStep: ["1. Create functional components returning JSX.", "2. Use useState for component-level interactive data.", "3. Pass props downward; emit events upward."],
            syntaxReference: "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}",
            workedExample: {
              title: "Interactive Toggle Component",
              description: "Shows stateful toggle with conditional styling.",
              code: `function ToggleBadge({ label }: { label: string }) {\n  const [active, setActive] = useState(false);\n  return (\n    <button \n      onClick={() => setActive(!active)}\n      className={active ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}\n    >\n      {label} {active ? "✓" : "+"}\n    </button>\n  );\n}`,
              expectedOutput: "Renders clickable toggle button updating color and icon dynamically"
            },
            commonMistakes: ["Mutating state directly like `state.push(x)` instead of `setState([...state, x])`.", "Missing `key` prop in lists."],
            debuggingTips: ["Use React Developer Tools browser extension to inspect props and state values."],
            practiceQuestions: ["Why must React state never be mutated directly?"],
            assignment: {
              title: "Build a Task Filter Component",
              prompt: "Create a React component that filters a list of tasks by 'All', 'Completed', and 'Pending'.",
              solutionHint: "Store current filter in state and use `.filter()` on the list during render.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What hook is used to manage local state in a React functional component?", options: ["useEffect", "useState", "useContext", "useMemo"], correctIndex: 1, explanation: "useState returns a stateful value and a function to update it." }],
            interviewRelevance: "Core technical topic in every frontend interview.",
            summaryNotes: ["State drives UI render.", "Always treat state as immutable."]
          }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Developer Architecture & APIs Track",
    shortTitle: "Backend Dev",
    level: "Intermediate",
    badge: "System Core",
    estimatedWeeks: 10,
    hoursPerWeek: 14,
    targetRole: "Backend Developer / API Engineer / Services Engineer",
    prerequisites: "Comfortable with at least one programming language (Java, Python, JS, Go).",
    skills: ["RESTful API Architecture", "Database Schema Design", "Authentication & JWT", "Caching & Redis", "System Security & OWASP", "Message Queues", "Microservices Concepts"],
    capstoneTitle: "Distributed Rate-Limited Payment & Webhook Service",
    capstoneDescription: "Build an idempotent payment processing gateway with webhook delivery, exponential backoff retries, and database auditing.",
    completionCriteria: ["Complete API design and security modules", "Build 1 secure authenticated service", "Pass Backend architecture exam"],
    careerReadinessOutcome: "Equipped to engineer secure, high-throughput server-side APIs and distributed backend systems.",
    modules: [
      {
        id: "be-m1",
        title: "Module 1: Secure Authentication & API Gateway Architecture",
        stage: 1,
        stageName: "API Design & Security",
        description: "Stateless JWT tokens, password hashing with BCrypt, CORS, rate limiting, and defensive validation.",
        lessons: [
          {
            id: "jwt-authentication-and-security",
            title: "Stateless JWT Authentication & BCrypt Password Hashing",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Understand Header, Payload, and Signature parts of a JWT", "Implement BCrypt hashing with salt rounds", "Protect API routes with filter chains"],
            prerequisites: ["REST API Basics"],
            explanation: "In modern distributed web systems, servers do not store session state in RAM. Instead, upon valid login, the server issues a cryptographically signed JSON Web Token (JWT). The client presents this token in the `Authorization: Bearer <token>` header on subsequent requests.",
            whyItMatters: "Stateless authentication allows backend servers to scale horizontally across dozens of instances without shared session storage.",
            realWorldAnalogy: "Like a festival wristband: security verifies the official stamp at the gate without needing to look you up in a guestbook every time you enter a tent.",
            stepByStep: ["1. User submits credentials over HTTPS.", "2. Server verifies password hash using BCrypt.", "3. Server signs JWT with private secret.", "4. Client stores JWT and sends in Authorization header."],
            syntaxReference: "// Authorization header:\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            workedExample: {
              title: "JWT Structure Verification",
              description: "Shows how signature prevents payload tampering.",
              code: `// Three parts separated by dots:\n// 1. Header: {"alg": "HS256", "typ": "JWT"}\n// 2. Payload: {"sub": "123", "name": "Alex", "exp": 1790000000}\n// 3. Signature: HMACSHA256(base64Url(Header) + "." + base64Url(Payload), secret)`,
              expectedOutput: "Valid tamper-evident cryptographically signed token"
            },
            commonMistakes: ["Storing plain-text passwords or using weak MD5/SHA1 hashes instead of salted BCrypt.", "Putting sensitive passwords or secrets inside JWT payload (payload is base64 encoded, not encrypted!)."],
            debuggingTips: ["Inspect token payloads on jwt.io during testing."],
            practiceQuestions: ["Why is BCrypt intentionally designed to be computationally slow?"],
            assignment: {
              title: "Implement Password Hash Verification",
              prompt: "Demonstrate why two identical passwords hash to completely different BCrypt strings due to salt.",
              solutionHint: "BCrypt generates a random 16-byte salt per hash.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "Is the payload of a standard JWT encrypted or encoded?", options: ["Encrypted with AES-256", "Base64Url Encoded (Readable by anyone)", "Hashed with SHA-256", "Compressed with GZIP"], correctIndex: 1, explanation: "JWT payloads are Base64Url encoded, meaning anyone with the token can decode and view the claims. Never put confidential secrets in payloads." }],
            interviewRelevance: "Essential security question in backend engineering interviews.",
            summaryNotes: ["Never store plain text passwords; use BCrypt with cost factor >= 12.", "JWT provides stateless authorization across microservices."]
          }
        ]
      }
    ]
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer (MERN / Spring + React) Track",
    shortTitle: "Full-Stack Dev",
    level: "Intermediate",
    badge: "End-to-End Builder",
    estimatedWeeks: 12,
    hoursPerWeek: 16,
    targetRole: "Full-Stack Developer / Full-Stack Software Engineer",
    prerequisites: "Basic programming fundamentals and enthusiasm for building complete products.",
    skills: ["React & TypeScript Frontend", "Spring Boot / Node Backend", "Relational Schema Design & SQL", "RESTful API Integration", "State Management & Reactivity", "Deployment & CI/CD", "Full-Stack Testing"],
    capstoneTitle: "Complete Campus Placement & Candidate Tracking SaaS",
    capstoneDescription: "Build the complete end-to-end Beam Academy platform with interactive student dashboards, real MySQL persistence, and verifiable certificates.",
    completionCriteria: ["Complete Frontend and Backend modules", "Build 1 end-to-end full-stack app", "Pass Full-Stack Capstone Defense"],
    careerReadinessOutcome: "Capable of designing database models, implementing backend services, creating sleek interactive web apps, and deploying production software.",
    modules: [
      {
        id: "fs-m1",
        title: "Module 1: Full-Stack Integration & Architecture",
        stage: 1,
        stageName: "End-to-End Architecture",
        description: "Connecting React clients to REST backends, typed API clients, handling loading and error states, and optimistic UI updates.",
        lessons: [
          {
            id: "client-server-data-lifecycle",
            title: "Client-Server Data Lifecycle & Typed API Integration",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Build typed API clients using Fetch and Axios", "Handle race conditions, loading states, and network errors gracefully", "Implement token management and session refreshing"],
            prerequisites: ["React Basics & REST API Basics"],
            explanation: "Full-stack development bridges client-side UI experiences with server-side business rules. The typed API client coordinates HTTP requests, deserializes JSON into typed interfaces, manages tokens, and provides clear user feedback during slow networks.",
            whyItMatters: "Building resilient client-server communication ensures users never see blank screens or frozen buttons during network glitches.",
            realWorldAnalogy: "Like a pneumatic tube system between a bank teller (Frontend) and the underground money vault (Backend).",
            stepByStep: ["1. Define TypeScript interfaces matching backend DTOs.", "2. Implement generic fetcher with centralized error handling.", "3. Manage loading, success, and error states in UI.", "4. Invalidate or update state upon successful mutation."],
            syntaxReference: "export async function apiRequest<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(await res.text());\n  return res.json();\n}",
            workedExample: {
              title: "Typed API Fetcher with Loading State",
              description: "Shows clean React data fetching pattern.",
              code: `function DashboardStatsWidget({ userId }: { userId: number }) {\n  const [stats, setStats] = useState<DashboardStats | null>(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    api.getDashboardStats(userId)\n      .then(setStats)\n      .finally(() => setLoading(false));\n  }, [userId]);\n  if (loading) return <div>Loading telemetry...</div>;\n  return <div>Overall Progress: {stats?.overallProgress}%</div>;\n}`,
              expectedOutput: "Smooth data loading without UI flashes"
            },
            commonMistakes: ["Leaving out error handling so API failures silently crash the frontend.", "Setting duplicate state instead of computing derived data."],
            debuggingTips: ["Check Network tab in DevTools to inspect HTTP status codes and response JSON."],
            practiceQuestions: ["How does optimistic UI update improve perceived user experience?"],
            assignment: {
              title: "Build a Full-Stack Toggle Interaction",
              prompt: "Implement a client toggle that immediately flips UI state, makes an API call, and rolls back if the server errors.",
              solutionHint: "Save previous state, update UI optimistically, and catch error to revert state.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What should a frontend do when a network call fails with a 500 server error?", options: ["Crash the React app", "Show a friendly error alert with retry option", "Silently do nothing", "Redirect to an empty page"], correctIndex: 1, explanation: "Proper defensive UX displays a clear error state and lets the user retry without losing context." }],
            interviewRelevance: "Top evaluation criteria for full-stack candidate assessments.",
            summaryNotes: ["Always use typed DTOs on both frontend and backend.", "Handle loading and error states explicitly in every component."]
          }
        ]
      }
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning Engineer Track",
    shortTitle: "AI / ML Engineer",
    level: "Intermediate",
    badge: "Next-Gen Intelligence",
    estimatedWeeks: 12,
    hoursPerWeek: 15,
    targetRole: "Machine Learning Engineer / AI Engineer / Data Scientist",
    prerequisites: "Python proficiency and foundational linear algebra/calculus.",
    skills: ["Python for ML (NumPy, Pandas)", "Applied Statistics & Probability", "Scikit-Learn Algorithms", "Neural Networks & PyTorch", "LLM Fine-Tuning & Prompt Engineering", "Vector Databases & RAG", "Model Evaluation & Metrics"],
    capstoneTitle: "Retrieval-Augmented Generation (RAG) Document Assistant",
    capstoneDescription: "Build a production RAG pipeline using embeddings, vector similarity search, and an LLM to answer questions over custom technical documentation.",
    completionCriteria: ["Complete ML algorithms and deep learning modules", "Build 1 end-to-end RAG pipeline", "Pass AI engineering evaluation"],
    careerReadinessOutcome: "Ready to deploy machine learning models, build LLM/RAG applications, and optimize modern AI pipelines.",
    modules: [
      {
        id: "aiml-m1",
        title: "Module 1: Machine Learning Foundations & Evaluation Metrics",
        stage: 1,
        stageName: "ML Foundations & Vectors",
        description: "Supervised vs Unsupervised learning, vector math, cosine similarity, precision, recall, F1 score, and RAG architectures.",
        lessons: [
          {
            id: "vector-embeddings-and-rag",
            title: "Vector Embeddings & Retrieval-Augmented Generation (RAG)",
            difficulty: "Intermediate",
            estimatedMinutes: 40,
            objectives: ["Understand how text transforms into dense mathematical vector embeddings", "Compute Cosine Similarity for semantic search", "Architect a complete RAG workflow"],
            prerequisites: ["Python Basics & Linear Algebra Foundations"],
            explanation: "Vector embeddings represent text as high-dimensional coordinates in semantic space (e.g. 1536 dimensions). Words or paragraphs with similar meanings map close together. RAG combines this vector search with generative LLMs: it retrieves relevant document chunks and provides them as context to the model, preventing hallucinations.",
            whyItMatters: "RAG is the core technology powering modern enterprise AI assistants, documentation search, and customer support bots.",
            realWorldAnalogy: "Like an open-book exam: instead of relying on pure memory (which might hallucinate), the AI opens the textbook to the exact relevant page before answering.",
            stepByStep: ["1. Chunk documents into 500-token sections.", "2. Generate dense vector embeddings for each chunk.", "3. Store vectors in an index (Pinecone, Chroma, pgvector).", "4. Convert user query to vector and find top K similar chunks via cosine similarity.", "5. Inject retrieved chunks into LLM prompt."],
            syntaxReference: "# Cosine similarity:\nsimilarity = dot(v1, v2) / (norm(v1) * norm(v2))",
            workedExample: {
              title: "Calculating Cosine Similarity in Python",
              description: "Shows mathematical similarity calculation between two vectors.",
              code: `import numpy as np\nv1 = np.array([1.0, 2.0, 0.5])\nv2 = np.array([1.2, 1.8, 0.4])\nsimilarity = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))\nprint(f"Cosine Similarity: {similarity:.4f}")`,
              expectedOutput: "Cosine Similarity: 0.9912"
            },
            commonMistakes: ["Creating document chunks that are too large (dilutes semantic meaning) or too small (loses context).", "Evaluating models with accuracy alone on imbalanced datasets instead of F1-score."],
            debuggingTips: ["Inspect retrieved context chunks to verify whether your vector search fetched the correct reference material."],
            practiceQuestions: ["Why does Cosine Similarity range from -1 to 1?", "How does RAG reduce AI hallucinations?"],
            assignment: {
              title: "Build a Simple Semantic Search Function",
              prompt: "Given 3 document vector arrays and a query vector, write a function that returns the index of the most semantically relevant document.",
              solutionHint: "Calculate dot product with each document and return `np.argmax(similarities)`.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What is the primary role of Retrieval-Augmented Generation (RAG)?", options: ["To train an LLM from scratch", "To retrieve relevant factual context and inject it into the prompt to prevent hallucinations", "To compress image files", "To replace SQL databases"], correctIndex: 1, explanation: "RAG retrieves relevant external documents and feeds them to the LLM to ground its answers in verified facts." }],
            interviewRelevance: "Highest frequency interview topic for modern AI Engineer roles.",
            summaryNotes: ["Embeddings capture semantic meaning as multi-dimensional coordinates.", "RAG grounds LLM responses with real retrieved documents."]
          }
        ]
      }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst & Business Intelligence Track",
    shortTitle: "Data Analyst",
    level: "Beginner",
    badge: "Analytics Core",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "Data Analyst / BI Analyst / Business Analytics Specialist",
    prerequisites: "None. Suitable for all majors.",
    skills: ["Advanced SQL & Window Functions", "Exploratory Data Analysis (EDA)", "Python (Pandas & Matplotlib)", "Data Cleaning & Imputation", "KPI Dashboards", "Statistical Hypothesis Testing"],
    capstoneTitle: "Placement Cohort Performance & Attrition Analytics",
    capstoneDescription: "Clean, analyze, and visualize student skill progression datasets to uncover key indicators of technical interview success.",
    completionCriteria: ["Complete SQL and Pandas analytics modules", "Build 1 KPI dashboard report", "Pass Analytics assessment"],
    careerReadinessOutcome: "Prepared to clean messy datasets, extract actionable business insights, and present data-backed narratives to leadership.",
    modules: [
      {
        id: "da-m1",
        title: "Module 1: Advanced SQL Analytics & Window Functions",
        stage: 1,
        stageName: "SQL & Analytics Foundations",
        description: "Window functions (`ROW_NUMBER`, `RANK`, `LEAD`, `LAG`), cumulative aggregates, and cohort retention analysis.",
        lessons: [
          {
            id: "sql-window-functions-and-kpis",
            title: "SQL Window Functions: Over, Partition By & Ranking",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Apply ROW_NUMBER, RANK, and DENSE_RANK", "Compute running totals and moving averages", "Calculate period-over-period growth with LAG and LEAD"],
            prerequisites: ["SQL Basics"],
            explanation: "Unlike `GROUP BY` which collapses rows into a single summary, Window Functions perform calculations across a set of rows while preserving each individual row in the result set.",
            whyItMatters: "Window functions are the secret weapon of high-performing data analysts, enabling running totals, rankings, and trends in single queries.",
            realWorldAnalogy: "Like calculating a marathon runner's standing: they keep their own individual time, but their rank is evaluated against their age cohort window.",
            stepByStep: ["1. Specify the window partition using `PARTITION BY`.", "2. Order the window frame with `ORDER BY`.", "3. Apply ranking or analytical functions like `DENSE_RANK()` or `SUM() OVER ()`."],
            syntaxReference: "SELECT student_id, score,\n       DENSE_RANK() OVER (PARTITION BY cohort_id ORDER BY score DESC) as rank_in_cohort\nFROM assessments;",
            workedExample: {
              title: "Running Total and Rank in SQL",
              description: "Shows running sum of study hours per student.",
              code: `SELECT user_id, date, study_minutes,\n       SUM(study_minutes) OVER (PARTITION BY user_id ORDER BY date) as cumulative_minutes\nFROM study_logs;`,
              expectedOutput: "Preserves daily rows while adding progressive cumulative minutes column"
            },
            commonMistakes: ["Confusing RANK (leaves gaps after ties, e.g. 1, 2, 2, 4) with DENSE_RANK (no gaps, e.g. 1, 2, 2, 3)."],
            debuggingTips: ["Check window order by clause if cumulative sums compute in reverse order."],
            practiceQuestions: ["How does `LAG(val, 1)` help calculate month-over-month revenue growth?"],
            assignment: {
              title: "Write Cohort Top-3 Ranker Query",
              prompt: "Write a query to find the top 3 highest scores in each learning category using window functions.",
              solutionHint: "Use a Common Table Expression (CTE) with `DENSE_RANK()`, then filter `WHERE rank <= 3`.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "Does a SQL window function collapse multiple rows into one row like GROUP BY?", options: ["Yes, always", "No, it retains individual rows while computing window values", "Only when using SUM()", "Depends on database engine"], correctIndex: 1, explanation: "Window functions retain all original rows, adding calculated aggregate columns across window frames." }],
            interviewRelevance: "Guaranteed question in every Data Analyst and Analytics Engineer interview.",
            summaryNotes: ["Window functions evaluate rows without collapsing result sets.", "Use PARTITION BY for grouped frames and ORDER BY for sequential ranking."]
          }
        ]
      }
    ]
  },
  {
    id: "data-engineer",
    title: "Data Engineer & Pipeline Architecture Track",
    shortTitle: "Data Engineer",
    level: "Intermediate",
    badge: "Big Data & ETL",
    estimatedWeeks: 10,
    hoursPerWeek: 14,
    targetRole: "Data Engineer / ETL Developer / Big Data Engineer",
    prerequisites: "Python and SQL proficiency.",
    skills: ["Data Warehousing (Snowflake / BigQuery)", "ETL & ELT Pipelines", "Apache Spark & PySpark", "Data Modeling (Star / Snowflake Schema)", "Kafka Streaming Concepts", "Airflow Workflow Orchestration"],
    capstoneTitle: "Real-Time Telemetry ETL Pipeline with Partitioned Storage",
    capstoneDescription: "Build a robust pipeline that ingests raw JSON activity streams, validates schemas, and partitions records into analytical Parquet storage.",
    completionCriteria: ["Complete ETL pipeline and schema design modules", "Build 1 automated data pipeline", "Pass Data Engineering assessment"],
    careerReadinessOutcome: "Equipped to design resilient data warehouses, orchestrate batch and stream ETL workflows, and optimize big data queries.",
    modules: [
      {
        id: "de-m1",
        title: "Module 1: ETL Architecture, Data Lakes & Parquet Modeling",
        stage: 1,
        stageName: "ETL & Columnar Storage",
        description: "Columnar storage (Parquet vs CSV), Star Schema modeling, idempotence in pipelines, and schema evolution.",
        lessons: [
          {
            id: "columnar-storage-and-star-schema",
            title: "Columnar Storage (Parquet) & Star Schema Data Modeling",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Understand why columnar formats (Parquet) outperform row formats (CSV) for analytics", "Design Fact and Dimension tables in Star Schema", "Implement idempotent pipeline writes"],
            prerequisites: ["SQL & Relational Databases"],
            explanation: "Analytical queries scan specific columns across millions of rows (e.g. `AVG(salary)`), rather than entire row records. Columnar formats like Apache Parquet store data by column on disk, drastically reducing I/O and enabling high compression ratios.",
            whyItMatters: "Using Parquet instead of CSV cuts analytical query costs and latency by 90% in cloud warehouses.",
            realWorldAnalogy: "Like a spreadsheet where you can slice out just Column D to read without unfolding the entire giant paper.",
            stepByStep: ["1. Separate business measurements (Fact Tables) from descriptive context (Dimension Tables).", "2. Store data partitioned by date/region in columnar Parquet.", "3. Ensure pipeline tasks are idempotent: re-running them produces the same result."],
            syntaxReference: "# PySpark Parquet write:\ndf.write.partitionBy('year', 'month').parquet('s3://data-lake/events/')",
            workedExample: {
              title: "Star Schema Fact and Dimension Model",
              description: "Separates fact metrics from dimension lookups.",
              code: `-- Fact Table:\nCREATE TABLE fact_quiz_attempts (\n    attempt_id BIGINT PRIMARY KEY,\n    user_dim_id BIGINT,\n    course_dim_id BIGINT,\n    date_dim_id INT,\n    score INT,\n    time_seconds INT\n);\n-- Dimension Table:\nCREATE TABLE dim_users (\n    user_dim_id BIGINT PRIMARY KEY,\n    email VARCHAR(255),\n    cohort VARCHAR(50)\n);`,
              expectedOutput: "Normalized dimensional model ready for high-speed OLAP aggregation"
            },
            commonMistakes: ["Writing analytical pipelines that output thousands of tiny files ('small file problem').", "Failing to make ETL jobs idempotent, resulting in duplicate records upon retry."],
            debuggingTips: ["Check row group sizes and partition column counts to avoid skewed partition data."],
            practiceQuestions: ["Why is Parquet faster than CSV for `SELECT AVG(score) FROM table`?"],
            assignment: {
              title: "Design a Learning Analytics Star Schema",
              prompt: "Design the Fact and Dimension tables for tracking student coding challenge attempts, including execution time and test case outcomes.",
              solutionHint: "Create `fact_coding_attempts` with metrics and link to `dim_students`, `dim_problems`, and `dim_calendar`.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "Why is Apache Parquet preferred over CSV for analytical queries in data lakes?", options: ["It is human-readable in Notepad", "It stores data column-by-column with compression, minimizing disk I/O for aggregations", "It does not support numbers", "It is only compatible with Python"], correctIndex: 1, explanation: "Parquet's columnar storage allows the engine to read only the columns requested by the query, skipping irrelevant data on disk." }],
            interviewRelevance: "Fundamental architecture question in Big Data and Data Engineering interviews.",
            summaryNotes: ["Parquet enables columnar projection and high compression.", "Star Schema separates numerical facts from descriptive dimensions."]
          }
        ]
      }
    ]
  },
  {
    id: "qa-engineer",
    title: "QA & Test Automation Engineer Track",
    shortTitle: "QA Automation",
    level: "Beginner",
    badge: "Quality Guard",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "QA Automation Engineer / Test Engineer / SDET",
    prerequisites: "Basic programming fundamentals.",
    skills: ["Test Methodologies & Test Cases", "Selenium & Playwright Automation", "API Testing with Postman/REST-Assured", "JUnit & Pytest Frameworks", "CI/CD Test Pipelines", "Performance Testing Basics"],
    capstoneTitle: "Full-Stack End-to-End Test Automation Suite",
    capstoneDescription: "Build a comprehensive automated test framework covering authentication, topic completion, API contract validation, and regression suites.",
    completionCriteria: ["Complete testing methodologies and automation modules", "Build 1 Playwright/Selenium test suite", "Pass QA certification exam"],
    careerReadinessOutcome: "Ready to design comprehensive test strategies, automate web and API regression suites, and guarantee software quality.",
    modules: [
      {
        id: "qa-m1",
        title: "Module 1: Test Automation Frameworks & API Contract Validation",
        stage: 1,
        stageName: "Test Automation & SDET",
        description: "The Testing Pyramid (Unit, Integration, E2E), Page Object Model (POM), REST-Assured, and CI/CD test automation.",
        lessons: [
          {
            id: "testing-pyramid-and-pom",
            title: "The Testing Pyramid & Page Object Model (POM)",
            difficulty: "Beginner",
            estimatedMinutes: 30,
            objectives: ["Understand the Testing Pyramid distribution", "Implement the Page Object Model pattern to eliminate brittle UI selectors", "Automate REST API contract tests"],
            prerequisites: ["Programming Basics & HTML"],
            explanation: "The Testing Pyramid dictates that applications should have thousands of fast, cheap Unit tests, hundreds of Integration tests, and a focused suite of End-to-End (E2E) UI tests. The Page Object Model abstracts web page selectors into reusable classes, shielding test logic from HTML changes.",
            whyItMatters: "Automated regression testing prevents bugs from reaching production and enables engineering teams to deploy multiple times a day.",
            realWorldAnalogy: "Like car manufacturing: you test individual bolts (unit), test the assembled engine (integration), and test-drive the finished vehicle on a track (E2E).",
            stepByStep: ["1. Write unit tests for core algorithms.", "2. Automate API tests for fast contract validation.", "3. Encapsulate UI locators inside Page Object classes.", "4. Run test suites automatically inside CI/CD pipelines."],
            syntaxReference: "// Page Object pattern:\nclass LoginPage {\n  constructor(page) { this.page = page; }\n  async login(user, pass) {\n    await this.page.fill('#email', user);\n    await this.page.fill('#password', pass);\n    await this.page.click('#submit-btn');\n  }\n}",
            workedExample: {
              title: "API Contract Validation with Assertions",
              description: "Validates status codes and JSON schema.",
              code: `// Test case asserting API response\nasync function testHealthEndpoint() {\n  const res = await fetch("http://localhost:8081/actuator/health");\n  const json = await res.json();\n  console.assert(res.status === 200, "Expected status 200");\n  console.assert(json.status === "UP", "Expected status UP");\n  console.log("Health test passed successfully!");\n}`,
              expectedOutput: "Health test passed successfully!"
            },
            commonMistakes: ["Writing slow, flaky E2E UI tests for logic that could easily be verified in a 2ms Unit test.", "Using hard-coded sleep delays instead of dynamic explicit waits."],
            debuggingTips: ["Check test execution screenshots and network logs when an automated test fails."],
            practiceQuestions: ["Why are hardcoded `Thread.sleep()` pauses an anti-pattern in test automation?"],
            assignment: {
              title: "Design a Test Plan for Login Flow",
              prompt: "Create a test matrix covering positive, negative, edge, and security test cases for a student authentication form.",
              solutionHint: "Include valid credentials, empty inputs, SQL injection attempts, expired sessions, and password length limits.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "According to the Testing Pyramid, which type of tests should form the largest foundation of your test suite?", options: ["End-to-End UI tests", "Fast, isolated Unit tests", "Manual exploratory tests", "Stress tests"], correctIndex: 1, explanation: "Unit tests are fast, deterministic, and cheap to run, forming the broad base of a healthy testing pyramid." }],
            interviewRelevance: "Core interview framework for QA Engineer and SDET positions.",
            summaryNotes: ["Unit tests give instant feedback; E2E tests verify user journeys.", "Page Object Model keeps automated UI tests maintainable."]
          }
        ]
      }
    ]
  },
  {
    id: "devops",
    title: "Cloud & DevOps Engineer Track",
    shortTitle: "Cloud & DevOps",
    level: "Intermediate",
    badge: "Infrastructure Core",
    estimatedWeeks: 10,
    hoursPerWeek: 14,
    targetRole: "DevOps Engineer / Cloud Platform Engineer / SRE",
    prerequisites: "Linux command line basics and introductory networking.",
    skills: ["Linux System Administration", "Docker Containerization", "Kubernetes Orchestration", "CI/CD (GitHub Actions)", "Cloud Architecture (AWS / GCP)", "Terraform (Infrastructure as Code)", "Observability & Monitoring"],
    capstoneTitle: "Multi-Stage Containerized CI/CD Deployment Pipeline",
    capstoneDescription: "Containerize full-stack application microservices with Docker, automate GitHub Actions pipelines, and deploy to a cluster with health monitoring.",
    completionCriteria: ["Complete Linux and Docker containerization modules", "Build 1 multi-stage Dockerfile and CI/CD workflow", "Pass Cloud & DevOps assessment"],
    careerReadinessOutcome: "Prepared to containerize applications, manage cloud infrastructure, automate deployment pipelines, and ensure high system availability.",
    modules: [
      {
        id: "devops-m1",
        title: "Module 1: Docker Containers, Linux Internals & CI/CD",
        stage: 1,
        stageName: "Containerization & CI/CD",
        description: "Namespaces and cgroups, multi-stage Docker builds, image slimming, GitHub Actions, and container security.",
        lessons: [
          {
            id: "docker-and-multi-stage-builds",
            title: "Docker Containers, Linux Namespaces & Multi-Stage Builds",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Understand how containers isolate processes using Linux Namespaces and Cgroups", "Write efficient multi-stage Dockerfiles that reduce image sizes by 80%", "Understand container lifecycle and port mapping"],
            prerequisites: ["Linux Command Line Basics"],
            explanation: "Unlike Virtual Machines which emulate entire hardware sets and run full guest operating systems, Docker containers share the host Linux kernel. They isolate processes using Linux Namespaces (process, network, mount) and control CPU/memory usage with Cgroups.",
            whyItMatters: "Containers eliminate the 'it works on my machine' bug by packaging application code with its exact runtime dependencies into an immutable image.",
            realWorldAnalogy: "A Virtual Machine is like shipping an entire furnished house on a barge. A Docker container is like a standardized shipping container: lightweight, uniform, and snaps onto any cargo ship.",
            stepByStep: ["1. Build application artifacts in a build stage with compilers.", "2. Copy only the compiled binaries into a slim runtime image (e.g., alpine or distroless).", "3. Never run containers as root; define a non-privileged user.", "4. Expose only required network ports."],
            syntaxReference: "# Multi-stage Dockerfile:\nFROM maven:3.9-eclipse-temurin-21 AS builder\nWORKDIR /app\nCOPY . .\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY --from=builder /app/target/*.jar app.jar\nEXPOSE 8081\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
            workedExample: {
              title: "Inspecting Container Resource Isolation",
              description: "Shows running containers with port and memory limits.",
              code: `# Run container with limits:\ndocker run -d -p 8081:8081 --memory="512m" --name beam-api beam-backend:latest\ndocker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"`,
              expectedOutput: "beam-api    Up 2 minutes    0.0.0.0:8081->8081/tcp"
            },
            commonMistakes: ["Leaving compilers, source files, and build tools inside the final production image, inflating image size and attack surface.", "Hardcoding database passwords and API keys inside Dockerfiles."],
            debuggingTips: ["Use `docker logs -f <container>` and `docker exec -it <container> sh` to troubleshoot running containers."],
            practiceQuestions: ["How do Docker containers differ from Virtual Machines?", "Why are multi-stage builds recommended?"],
            assignment: {
              title: "Create a Multi-Stage Dockerfile",
              prompt: "Write a multi-stage Dockerfile for a React Vite frontend that builds static assets and serves them via an Nginx alpine container.",
              solutionHint: "Stage 1: node:20-alpine -> npm run build. Stage 2: nginx:alpine -> COPY --from=build /app/dist /usr/share/nginx/html.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What Linux kernel features provide the process isolation and resource limits for Docker containers?", options: ["Hypervisor and BIOS", "Namespaces and Control Groups (Cgroups)", "SWAP memory and cron", "GRUB bootloader"], correctIndex: 1, explanation: "Linux Namespaces provide process and network isolation; Cgroups enforce CPU and memory limits." }],
            interviewRelevance: "Guaranteed question in every DevOps, Cloud, and SRE interview.",
            summaryNotes: ["Containers share the host kernel, making them lightweight and instant to boot.", "Multi-stage builds produce tiny, secure production images."]
          }
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Fundamentals & Defensive Security Track",
    shortTitle: "Cybersecurity",
    level: "Beginner",
    badge: "Defensive Shield",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "Security Analyst / SOC Analyst / Junior Application Security Engineer",
    prerequisites: "Basic understanding of networking and operating systems.",
    skills: ["OWASP Top 10 Vulnerabilities", "SQL Injection & XSS Defense", "Cryptography & Hashing", "Network Protocols & Wireshark", "Authentication & Authorization Security", "Security Auditing & Threat Modeling"],
    capstoneTitle: "Secure API Hardening & Vulnerability Remediation Lab",
    capstoneDescription: "Identify and patch OWASP Top 10 vulnerabilities (SQLi, IDOR, XSS, Broken Auth) in an intentional vulnerable testbed service.",
    completionCriteria: ["Complete OWASP Top 10 defense modules", "Patch 3 security vulnerabilities in code", "Pass Cybersecurity fundamentals exam"],
    careerReadinessOutcome: "Trained to identify security flaws, defend web applications against cyber attacks, and apply secure coding principles.",
    modules: [
      {
        id: "sec-m1",
        title: "Module 1: OWASP Top 10 Web Vulnerabilities & Secure Coding",
        stage: 1,
        stageName: "Application Security & OWASP",
        description: "SQL Injection, Cross-Site Scripting (XSS), Insecure Direct Object References (IDOR), and cryptographic best practices.",
        lessons: [
          {
            id: "sqli-xss-and-idor-defense",
            title: "Defending Against SQL Injection, XSS & Broken Access Control",
            difficulty: "Beginner",
            estimatedMinutes: 35,
            objectives: ["Understand how untrusted user input causes SQL Injection", "Prevent Cross-Site Scripting (XSS) with context encoding", "Eliminate Insecure Direct Object References (IDOR) with authorization checks"],
            prerequisites: ["Web Basics & SQL Basics"],
            explanation: "Application security is built on one golden rule: Never trust user input. When user input is directly concatenated into SQL queries or HTML output, attackers can execute unauthorized commands or steal session cookies. Parameterized queries and server-side authorization checks are mandatory.",
            whyItMatters: "Data breaches cost companies millions of dollars and compromise user privacy. Developers who write secure code are highly prized.",
            realWorldAnalogy: "Like sanitizing packages at an airport: everything coming from the outside must be scanned and quarantined before entering the secured terminal.",
            stepByStep: ["1. Always use Parameterized Queries (Prepared Statements) for database queries.", "2. Encode and sanitize any user input reflected in web responses.", "3. Verify object ownership on the server: Never assume a user owns an ID just because they supplied it in the URL."],
            syntaxReference: "// Vulnerable:\nString query = \"SELECT * FROM users WHERE email = '\" + input + \"'\";\n\n// Secure (Parameterized):\nPreparedStatement ps = conn.prepareStatement(\"SELECT * FROM users WHERE email = ?\");\nps.setString(1, input);",
            workedExample: {
              title: "Preventing IDOR with Server-Side Ownership Checks",
              description: "Shows proper authorization check before returning user data.",
              code: `@GetMapping("/profile/{requestedId}")\npublic ResponseEntity<Profile> getProfile(\n    @PathVariable Long requestedId,\n    @AuthenticationPrincipal User currentUser) {\n    // Prevent IDOR: Verify ownership\n    if (!currentUser.getId().equals(requestedId) && !currentUser.isAdmin()) {\n        throw new UnauthorizedException("Forbidden: You cannot access this profile.");\n    }\n    return ResponseEntity.ok(profileService.get(requestedId));\n}`,
              expectedOutput: "Blocks unauthorized user from viewing private data of another account"
            },
            commonMistakes: ["Relying on frontend validation alone (attackers can bypass frontend using cURL or Postman!).", "Concatenating user inputs into SQL strings."],
            debuggingTips: ["Test endpoints with unexpected characters (`' OR 1=1 --`) to verify query parameterization."],
            practiceQuestions: ["Why do Prepared Statements neutralize SQL Injection?"],
            assignment: {
              title: "Code Review Security Audit",
              prompt: "Identify and patch the security vulnerability in: `SELECT * FROM accounts WHERE acc_num = ' + req.getParameter('acc')`.",
              solutionHint: "Replace string concatenation with a parameterized Prepared Statement using `?` placeholders.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "What is the most effective defense against SQL Injection?", options: ["Client-side JavaScript input filters", "Parameterized Queries (Prepared Statements)", "Using a strong database password", "Encrypting the hard drive"], correctIndex: 1, explanation: "Parameterized queries separate SQL code from data, ensuring user inputs are never interpreted as executable commands." }],
            interviewRelevance: "Crucial topic in security interviews and software engineering hiring.",
            summaryNotes: ["Never trust client-side data; validate everything on the server.", "Always use Parameterized Queries and verify object ownership."]
          }
        ]
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Application Developer (React Native / Flutter) Track",
    shortTitle: "Mobile Dev",
    level: "Beginner",
    badge: "Cross-Platform Mobile",
    estimatedWeeks: 10,
    hoursPerWeek: 14,
    targetRole: "Mobile App Developer / React Native Engineer / Android & iOS Developer",
    prerequisites: "Basic JavaScript or Dart programming.",
    skills: ["React Native & Mobile Architecture", "Native Device APIs (Camera, GPS)", "Offline Storage & Async Sync", "Navigation & Deep Linking", "Mobile State Management", "App Store & Play Store Deployment"],
    capstoneTitle: "Cross-Platform Mobile Placement Tracker & Offline Journal",
    capstoneDescription: "Build a native iOS and Android application with offline task storage, push notifications, and stopwatch session timers.",
    completionCriteria: ["Complete React Native mobile components", "Build 1 offline-first mobile app", "Pass Mobile developer assessment"],
    careerReadinessOutcome: "Capable of shipping native-feeling mobile applications for iOS and Android devices.",
    modules: [
      {
        id: "mob-m1",
        title: "Module 1: Mobile Components, Gestures & Offline Persistence",
        stage: 1,
        stageName: "Mobile Architecture",
        description: "Mobile component primitives (View, Text, FlatList), native gestures, Async Storage, and offline caching.",
        lessons: [
          {
            id: "mobile-components-and-offline-sync",
            title: "Mobile Primitives, FlatList Performance & Offline Storage",
            difficulty: "Beginner",
            estimatedMinutes: 30,
            objectives: ["Understand mobile UI primitives vs web HTML tags", "Optimize large list rendering using FlatList", "Persist state offline with AsyncStorage"],
            prerequisites: ["JavaScript Basics"],
            explanation: "Mobile devices have limited memory, intermittent network connectivity, and touch-based interactions. Mobile frameworks render native UI widgets (UIView on iOS, android.view.View on Android). Fast scrolling lists must recycle views to prevent memory exhaustion.",
            whyItMatters: "Billions of users access educational and productivity software primarily through mobile smartphones.",
            realWorldAnalogy: "Like a stage play where only actors currently on stage wear costumes, rather than dressing the entire town backstage.",
            stepByStep: ["1. Use `<View>` instead of `<div>` and `<Text>` instead of `<p>`.", "2. Use `<FlatList>` for infinite scrolling to recycle off-screen views.", "3. Cache critical data in offline storage for instant launch."],
            syntaxReference: "<FlatList\n  data={items}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <TopicCard topic={item} />}\n/>",
            workedExample: {
              title: "FlatList Virtualized Mobile Feed",
              description: "Shows performant native list rendering.",
              code: `import { FlatList, Text, View } from 'react-native';\nexport function TopicList({ topics }) {\n  return (\n    <FlatList\n      data={topics}\n      keyExtractor={item => item.id}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16, borderBottomWidth: 1 }}>\n          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>\n        </View>\n      )}\n    />\n  );\n}`,
              expectedOutput: "High-performance 60 FPS mobile list"
            },
            commonMistakes: ["Using standard `<ScrollView>` with hundreds of items instead of `<FlatList>`, causing mobile app crashes.", "Forgetting that mobile networks drop out frequently and failing to provide offline caching."],
            debuggingTips: ["Use Flipper or React Native Debugger to inspect component hierarchies and network calls."],
            practiceQuestions: ["Why does `<FlatList>` perform better than `<ScrollView>` for long lists?"],
            assignment: {
              title: "Build an Offline Mobile Notes Screen",
              prompt: "Implement a mobile screen that saves study notes to local device storage and restores them when the app reopens.",
              solutionHint: "Use `AsyncStorage.setItem()` on change and `AsyncStorage.getItem()` on mount.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "Why does React Native use FlatList instead of ScrollView for large datasets?", options: ["It uses less battery", "It virtualizes and recycles only the visible items, preventing memory bloat", "It does not need keys", "It only works on Android"], correctIndex: 1, explanation: "FlatList renders only items currently visible on screen, recycling memory as the user scrolls." }],
            interviewRelevance: "Standard question in every Mobile Developer and React Native interview.",
            summaryNotes: ["Mobile apps require defensive offline design.", "FlatList virtualizes off-screen components to maintain 60 FPS."]
          }
        ]
      }
    ]
  },
  {
    id: "database-sql",
    title: "Database & SQL Developer Track",
    shortTitle: "Database & SQL",
    level: "Beginner",
    badge: "Data Modeling Expert",
    estimatedWeeks: 8,
    hoursPerWeek: 12,
    targetRole: "Database Developer / SQL Developer / Database Administrator (DBA)",
    prerequisites: "None. Absolute beginners welcome.",
    skills: ["Relational Database Design (1NF - 3NF)", "Advanced SQL Query Crafting", "Indexing Strategies (B-Tree, Hash, GIN)", "Stored Procedures & Triggers", "Transaction Concurrency & Locks", "Database Replication & Backup"],
    capstoneTitle: "Enterprise Multi-Tenant Relational Schema & Optimization",
    capstoneDescription: "Design, normalize, and benchmark a multi-tenant university portal database with indexed foreign keys, audit triggers, and sub-5ms queries.",
    completionCriteria: ["Complete SQL querying and normalization modules", "Benchmark 5 optimized queries with EXPLAIN", "Pass SQL Master certification"],
    careerReadinessOutcome: "Master of relational architecture, query execution plans, indexing strategies, and database optimization.",
    modules: [
      {
        id: "dbsql-m1",
        title: "Module 1: Relational Architecture, Transactions & Concurrency",
        stage: 1,
        stageName: "Relational Modeling & Optimization",
        description: "ACID transactions, isolation levels, optimistic vs pessimistic locking, and query plan optimization.",
        lessons: [
          {
            id: "transactions-and-acid-isolation",
            title: "ACID Transactions & Transaction Isolation Levels",
            difficulty: "Intermediate",
            estimatedMinutes: 35,
            objectives: ["Define Atomicity, Consistency, Isolation, and Durability", "Distinguish Read Committed, Repeatable Read, and Serializable levels", "Prevent race conditions with Optimistic and Pessimistic Locking"],
            prerequisites: ["SQL Basics"],
            explanation: "Transactions group multiple SQL operations into a single atomic unit of work: either all succeed or all rollback. Transaction Isolation Levels control how concurrent transactions see changes made by other transactions, preventing dirty reads, non-repeatable reads, and phantom reads.",
            whyItMatters: "Banking systems, ticket booking engines, and e-commerce platforms rely on ACID isolation to prevent double-spending and inventory overselling.",
            realWorldAnalogy: "An ATM withdrawal: debiting your account and dispensing cash must happen together. If cash fails to dispense, the debit is rolled back automatically.",
            stepByStep: ["1. Begin transaction (`START TRANSACTION`).", "2. Execute required SELECT and UPDATE statements.", "3. If error occurs, issue `ROLLBACK`.", "4. If all validations succeed, issue `COMMIT`."],
            syntaxReference: "START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
            workedExample: {
              title: "Pessimistic Locking with SELECT FOR UPDATE",
              description: "Locks the row until transaction completes to prevent race conditions.",
              code: `START TRANSACTION;\n-- Locks row exclusively:\nSELECT balance FROM accounts WHERE id = 1 FOR UPDATE;\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nCOMMIT;`,
              expectedOutput: "Ensures no concurrent transaction can modify row during update"
            },
            commonMistakes: ["Leaving transactions open for long periods, causing lock contention and database timeouts.", "Choosing SERIALIZABLE isolation everywhere, destroying application concurrency."],
            debuggingTips: ["Check `SHOW ENGINE INNODB STATUS` in MySQL to inspect deadlocks and lock waits."],
            practiceQuestions: ["What is the difference between a Dirty Read and a Phantom Read?"],
            assignment: {
              title: "Bank Transfer Transaction Script",
              prompt: "Write a SQL stored procedure or transaction block that safely transfers funds between two bank accounts with balance verification.",
              solutionHint: "Check balance >= amount before debiting. Rollback if insufficient funds.",
              maxScore: 10
            },
            knowledgeCheck: [{ question: "Which ACID property guarantees that all operations in a transaction succeed together or none at all?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], correctIndex: 0, explanation: "Atomicity ensures the 'all-or-nothing' principle of transaction execution." }],
            interviewRelevance: "Classic database interview topic for every backend and database role.",
            summaryNotes: ["Atomicity ensures all-or-nothing execution.", "Isolation levels balance concurrency speed against data consistency anomalies."]
          }
        ]
      }
    ]
  }
];

export function getCareerPathById(id: string): CareerPath | undefined {
  return careerPaths.find((p) => p.id === id);
}

export function getAllCareerPaths(): CareerPath[] {
  return careerPaths;
}

export function findLessonById(lessonId: string): { path: CareerPath; module: CareerModule; lesson: CareerLesson } | undefined {
  for (const path of careerPaths) {
    for (const mod of path.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.id === lessonId) {
          return { path, module: mod, lesson };
        }
      }
    }
  }
  return undefined;
}
