import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

interface Lesson {
  title: string;
  explanation: string;
  points: string[];
  example: string;
  interview: string[];
  practice: string[];
}

const lessons: Record<string, Lesson> = {

  /* ================= JAVA ================= */

  "java-basics": {
    title: "Java Basics",
    explanation:
      "Java is a high-level, object-oriented and platform-independent programming language.",
    points: [
      "Java source code is compiled into bytecode.",
      "Bytecode runs on the JVM.",
      "JDK is used to develop Java applications.",
      "JRE provides the environment to run Java applications.",
      "JVM executes Java bytecode."
    ],
    example: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}`,
    interview: [
      "What is Java?",
      "Why is Java platform independent?",
      "What is JVM?",
      "Difference between JDK, JRE and JVM?"
    ],
    practice: [
      "Write your first Java program.",
      "Print your name and college.",
      "Explain JVM, JRE and JDK."
    ]
  },

  "variables": {
    title: "Variables",
    explanation:
      "Variables are named memory locations used to store data.",
    points: [
      "Every variable has a data type.",
      "Primitive types include int, char, boolean, double etc.",
      "Reference variables store references to objects.",
      "Variables can be local, instance or static."
    ],
    example: `int age = 21;
double salary = 25000.50;
char grade = 'A';
boolean active = true;
String name = "Sowmya";`,
    interview: [
      "What is a variable?",
      "What are primitive data types?",
      "Difference between local and instance variables?",
      "What is type casting?"
    ],
    practice: [
      "Create variables for name, age and CGPA.",
      "Perform implicit and explicit type casting."
    ]
  },

  "operators": {
    title: "Operators",
    explanation:
      "Operators perform operations on variables and values.",
    points: [
      "Arithmetic: + - * / %",
      "Relational: > < >= <= == !=",
      "Logical: && || !",
      "Assignment: = += -= *= /=",
      "Unary: ++ --"
    ],
    example: `int a = 10;
int b = 5;

System.out.println(a + b);
System.out.println(a > b);
System.out.println(a == b);`,
    interview: [
      "What is the difference between == and equals()?",
      "What are logical operators?",
      "What is the difference between ++i and i++?"
    ],
    practice: [
      "Write a program to perform arithmetic operations.",
      "Check whether two numbers are equal."
    ]
  },

  "loops": {
    title: "Loops",
    explanation:
      "Loops repeatedly execute a block of code.",
    points: [
      "for loop",
      "while loop",
      "do-while loop",
      "break",
      "continue"
    ],
    example: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}`,
    interview: [
      "Difference between while and do-while?",
      "When should you use for loop?",
      "Difference between break and continue?"
    ],
    practice: [
      "Print numbers from 1 to 100.",
      "Print multiplication table.",
      "Find sum of first N numbers.",
      "Print a star pattern."
    ]
  },

  "arrays": {
    title: "Arrays",
    explanation:
      "An array stores multiple values of the same type.",
    points: [
      "Index starts from 0.",
      "Array size is fixed.",
      "Arrays can store primitive values.",
      "Arrays are heavily used in DSA."
    ],
    example: `int[] numbers = {10, 20, 30, 40};

for (int n : numbers) {
    System.out.println(n);
}`,
    interview: [
      "What is an array?",
      "Why does array indexing start at 0?",
      "Difference between array and ArrayList?"
    ],
    practice: [
      "Find maximum element.",
      "Find minimum element.",
      "Reverse an array.",
      "Find duplicate elements."
    ]
  },

  "strings": {
    title: "Strings",
    explanation:
      "String represents a sequence of characters.",
    points: [
      "String is immutable.",
      "String literals are stored in the String pool.",
      "Use equals() to compare string contents.",
      "StringBuilder is useful for mutable strings."
    ],
    example: `String name = "Sowmya";

System.out.println(name.length());
System.out.println(name.charAt(0));
System.out.println(name.toUpperCase());`,
    interview: [
      "Why is String immutable?",
      "Difference between == and equals() for Strings?",
      "String vs StringBuilder vs StringBuffer?"
    ],
    practice: [
      "Reverse a String.",
      "Check palindrome.",
      "Count vowels.",
      "Find duplicate characters."
    ]
  },

  "oop": {
    title: "Object-Oriented Programming",
    explanation:
      "OOP organizes programs using classes and objects.",
    points: [
      "Class",
      "Object",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction"
    ],
    example: `class Student {

    String name;

    void display() {
        System.out.println(name);
    }
}

Student s = new Student();
s.name = "Sowmya";
s.display();`,
    interview: [
      "What are the four pillars of OOP?",
      "What is inheritance?",
      "Overloading vs overriding?",
      "What is abstraction?",
      "What is encapsulation?"
    ],
    practice: [
      "Create a Student class.",
      "Implement inheritance.",
      "Create overloaded methods.",
      "Create an interface."
    ]
  },

  "collections": {
    title: "Collections",
    explanation:
      "The Collections Framework provides data structures for storing groups of objects.",
    points: [
      "List",
      "Set",
      "Map",
      "ArrayList",
      "LinkedList",
      "HashSet",
      "HashMap"
    ],
    example: `ArrayList<String> names = new ArrayList<>();

names.add("Sowmya");
names.add("Rahul");

System.out.println(names);`,
    interview: [
      "ArrayList vs LinkedList?",
      "HashSet vs TreeSet?",
      "HashMap vs Hashtable?",
      "How does HashMap work?"
    ],
    practice: [
      "Remove duplicates using HashSet.",
      "Count frequencies using HashMap.",
      "Sort an ArrayList."
    ]
  },

  "multithreading": {
    title: "Multithreading",
    explanation:
      "Multithreading allows multiple tasks to execute concurrently.",
    points: [
      "Thread represents a unit of execution.",
      "Thread can be created using Thread class.",
      "Runnable can also be used.",
      "Synchronization prevents race conditions."
    ],
    example: `class MyTask extends Thread {

    public void run() {
        System.out.println("Task running");
    }
}

MyTask t = new MyTask();
t.start();`,
    interview: [
      "What is a thread?",
      "Thread vs process?",
      "start() vs run()?",
      "What is synchronization?"
    ],
    practice: [
      "Create a thread using Thread.",
      "Create a thread using Runnable."
    ]
  },

  "jdbc": {
    title: "JDBC",
    explanation:
      "JDBC allows Java applications to communicate with databases.",
    points: [
      "JDBC stands for Java Database Connectivity.",
      "Connection connects Java to database.",
      "PreparedStatement executes parameterized SQL.",
      "ResultSet stores query results."
    ],
    example: `Connection con =
DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/beam_academy",
    "root",
    "password"
);

PreparedStatement ps =
con.prepareStatement(
    "SELECT * FROM users"
);

ResultSet rs = ps.executeQuery();`,
    interview: [
      "What is JDBC?",
      "What is Connection?",
      "Statement vs PreparedStatement?",
      "What is ResultSet?"
    ],
    practice: [
      "Connect Java to MySQL.",
      "Insert a record.",
      "Retrieve records.",
      "Update a record."
    ]
  },

  "spring-boot": {
    title: "Spring Boot",
    explanation:
      "Spring Boot simplifies development of production-ready Java applications and REST APIs.",
    points: [
      "Dependency Injection",
      "REST APIs",
      "Spring MVC",
      "Spring Data JPA",
      "Application properties",
      "Embedded Tomcat"
    ],
    example: `@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello Beam";
    }
}`,
    interview: [
      "What is Spring Boot?",
      "What is dependency injection?",
      "What is @RestController?",
      "What is @Autowired?",
      "What is Spring Data JPA?"
    ],
    practice: [
      "Create a REST API.",
      "Create a GET endpoint.",
      "Create a POST endpoint.",
      "Connect Spring Boot to MySQL."
    ]
  },

  /* ================= SQL ================= */

  "select": {
    title: "SQL SELECT",
    explanation:
      "SELECT is used to retrieve data from database tables.",
    points: [
      "SELECT retrieves columns.",
      "WHERE filters rows.",
      "ORDER BY sorts results.",
      "DISTINCT removes duplicate results."
    ],
    example: `SELECT * FROM employees;

SELECT name, salary
FROM employees;

SELECT DISTINCT department
FROM employees;`,
    interview: [
      "What is SELECT?",
      "Difference between SELECT * and selecting columns?",
      "What is DISTINCT?"
    ],
    practice: [
      "Display all employees.",
      "Display employee names and salaries."
    ]
  },

  "where": {
    title: "SQL WHERE",
    explanation:
      "WHERE filters rows based on conditions.",
    points: [
      "Used with SELECT, UPDATE and DELETE.",
      "Supports comparison operators.",
      "Can combine conditions using AND and OR."
    ],
    example: `SELECT *
FROM employees
WHERE salary > 30000;

SELECT *
FROM employees
WHERE department = 'IT';`,
    interview: [
      "What is WHERE?",
      "WHERE vs HAVING?"
    ],
    practice: [
      "Find employees earning above 50000.",
      "Find employees from IT department."
    ]
  },

  "group-by": {
    title: "SQL GROUP BY",
    explanation:
      "GROUP BY groups rows so aggregate functions can be applied.",
    points: [
      "COUNT",
      "SUM",
      "AVG",
      "MAX",
      "MIN"
    ],
    example: `SELECT department,
       COUNT(*)
FROM employees
GROUP BY department;`,
    interview: [
      "Why is GROUP BY used?",
      "GROUP BY vs ORDER BY?"
    ],
    practice: [
      "Find number of employees per department.",
      "Find average salary per department."
    ]
  },

  "having": {
    title: "SQL HAVING",
    explanation:
      "HAVING filters grouped results.",
    points: [
      "Usually used with GROUP BY.",
      "WHERE filters rows before grouping.",
      "HAVING filters groups after grouping."
    ],
    example: `SELECT department,
       AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;`,
    interview: [
      "WHERE vs HAVING?",
      "Can HAVING be used without GROUP BY?"
    ],
    practice: [
      "Find departments having more than 5 employees."
    ]
  },

  "joins": {
    title: "SQL JOINS",
    explanation:
      "Joins combine rows from multiple tables.",
    points: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    example: `SELECT e.name,
       d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.id;`,
    interview: [
      "What is a JOIN?",
      "INNER JOIN vs LEFT JOIN?",
      "What is a self join?"
    ],
    practice: [
      "Join employees and departments.",
      "Find employees without departments."
    ]
  },

  "subqueries": {
    title: "SQL Subqueries",
    explanation:
      "A subquery is a query nested inside another query.",
    points: [
      "Can appear in WHERE.",
      "Can appear in FROM.",
      "Can appear in SELECT.",
      "Can be correlated."
    ],
    example: `SELECT name
FROM employees
WHERE salary >
      (SELECT AVG(salary)
       FROM employees);`,
    interview: [
      "What is a subquery?",
      "Subquery vs join?",
      "What is correlated subquery?"
    ],
    practice: [
      "Find employees earning above average salary."
    ]
  },

  "views": {
    title: "SQL Views",
    explanation:
      "A view is a virtual table based on a query.",
    points: [
      "Views simplify complex queries.",
      "Views can restrict access to columns.",
      "Views do not normally store data separately."
    ],
    example: `CREATE VIEW employee_view AS
SELECT name, salary
FROM employees;`,
    interview: [
      "What is a view?",
      "Why are views used?",
      "Can a view be updated?"
    ],
    practice: [
      "Create a view containing employee names and salaries."
    ]
  },

  "indexes": {
    title: "SQL Indexes",
    explanation:
      "Indexes improve data retrieval speed.",
    points: [
      "Indexes speed up searches.",
      "Indexes require additional storage.",
      "Too many indexes can slow INSERT and UPDATE operations."
    ],
    example: `CREATE INDEX idx_employee_name
ON employees(name);`,
    interview: [
      "What is an index?",
      "Advantages of indexes?",
      "What is a full table scan?"
    ],
    practice: [
      "Create an index on employee email.",
      "Understand EXPLAIN PLAN."
    ]
  },

  "normalization": {
    title: "Database Normalization",
    explanation:
      "Normalization organizes data to reduce redundancy and improve integrity.",
    points: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF",
      "Reduces data redundancy.",
      "Prevents update anomalies."
    ],
    example: `Student
---------
Student_ID
Name
Department_ID

Department
----------
Department_ID
Department_Name`,
    interview: [
      "What is normalization?",
      "Explain 1NF.",
      "Explain 2NF.",
      "Explain 3NF.",
      "What is BCNF?"
    ],
    practice: [
      "Normalize a student table to 3NF.",
      "Identify partial dependency."
    ]
  },

  /* ================= DSA ================= */

  "linked-list": {
    title: "Linked List",
    explanation:
      "A linked list is a linear data structure made of nodes.",
    points: [
      "Each node stores data.",
      "Each node stores a reference to another node.",
      "Insertion and deletion can be efficient.",
      "Singly and doubly linked lists are common."
    ],
    example: `class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}`,
    interview: [
      "Array vs Linked List?",
      "Singly vs doubly linked list?",
      "How do you detect a cycle?"
    ],
    practice: [
      "Reverse a linked list.",
      "Find middle node.",
      "Detect cycle."
    ]
  },

  "stack": {
    title: "Stack",
    explanation:
      "Stack follows the LIFO principle.",
    points: [
      "LIFO means Last In First Out.",
      "push adds an element.",
      "pop removes the top element.",
      "peek views the top element."
    ],
    example: `Stack<Integer> stack = new Stack<>();

stack.push(10);
stack.push(20);

System.out.println(stack.pop());`,
    interview: [
      "What is stack?",
      "Where is stack used?",
      "Stack vs Queue?"
    ],
    practice: [
      "Valid parentheses.",
      "Reverse a string using stack."
    ]
  },

  "queue": {
    title: "Queue",
    explanation:
      "Queue follows the FIFO principle.",
    points: [
      "FIFO means First In First Out.",
      "enqueue adds data.",
      "dequeue removes data."
    ],
    example: `Queue<Integer> queue =
    new LinkedList<>();

queue.add(10);
queue.add(20);

System.out.println(queue.poll());`,
    interview: [
      "Stack vs Queue?",
      "What is circular queue?"
    ],
    practice: [
      "Implement queue.",
      "Implement circular queue."
    ]
  },

  "trees": {
    title: "Trees",
    explanation:
      "A tree is a hierarchical data structure.",
    points: [
      "Root",
      "Parent",
      "Child",
      "Leaf",
      "Binary Tree",
      "Binary Search Tree"
    ],
    example: `class Node {
    int data;
    Node left;
    Node right;
}`,
    interview: [
      "What is a binary tree?",
      "What is BST?",
      "Explain tree traversals."
    ],
    practice: [
      "Inorder traversal.",
      "Preorder traversal.",
      "Postorder traversal.",
      "Find height of tree."
    ]
  },

  "graphs": {
    title: "Graphs",
    explanation:
      "A graph consists of vertices and edges.",
    points: [
      "Directed graph",
      "Undirected graph",
      "Weighted graph",
      "BFS",
      "DFS"
    ],
    example: `List<List<Integer>> graph =
    new ArrayList<>();`,
    interview: [
      "BFS vs DFS?",
      "What is a directed graph?",
      "What is a cycle?"
    ],
    practice: [
      "Implement BFS.",
      "Implement DFS.",
      "Detect a cycle."
    ]
  },

  "heap": {
    title: "Heap",
    explanation:
      "A heap is a complete binary tree commonly used to implement priority queues.",
    points: [
      "Min Heap",
      "Max Heap",
      "PriorityQueue",
      "Heapify"
    ],
    example: `PriorityQueue<Integer> pq =
    new PriorityQueue<>();

pq.add(30);
pq.add(10);
pq.add(20);

System.out.println(pq.poll());`,
    interview: [
      "What is a heap?",
      "Min heap vs max heap?",
      "What is a priority queue?"
    ],
    practice: [
      "Find kth largest element.",
      "Find kth smallest element."
    ]
  },

  "greedy": {
    title: "Greedy Algorithms",
    explanation:
      "Greedy algorithms make the locally best choice at each step.",
    points: [
      "Local optimal choice.",
      "Used when greedy-choice property exists.",
      "Common examples include activity selection."
    ],
    example: `// Activity selection idea

Arrays.sort(activities,
    Comparator.comparingInt(a -> a.end));`,
    interview: [
      "What is greedy algorithm?",
      "Greedy vs dynamic programming?"
    ],
    practice: [
      "Activity selection.",
      "Fractional knapsack."
    ]
  },

  "dynamic-programming": {
    title: "Dynamic Programming",
    explanation:
      "Dynamic programming solves problems by storing results of overlapping subproblems.",
    points: [
      "Overlapping subproblems.",
      "Optimal substructure.",
      "Memoization.",
      "Tabulation."
    ],
    example: `int[] dp = new int[n + 1];

dp[0] = 0;
dp[1] = 1;

for (int i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
}`,
    interview: [
      "What is dynamic programming?",
      "Memoization vs tabulation?",
      "DP vs recursion?"
    ],
    practice: [
      "Climbing stairs.",
      "Fibonacci.",
      "0/1 Knapsack."
    ]
  },

  "dsa-arrays": {
    title: "DSA Arrays",
    explanation:
      "Arrays are one of the most important structures for placement coding problems.",
    points: [
      "Traversal",
      "Searching",
      "Sorting",
      "Two pointers",
      "Sliding window"
    ],
    example: `int[] arr = {2, 7, 11, 15};

for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
    interview: [
      "Time complexity of array access?",
      "How do you find duplicates?",
      "What is two pointer technique?"
    ],
    practice: [
      "Two Sum.",
      "Maximum subarray.",
      "Move zeroes.",
      "Best time to buy and sell stock."
    ]
  },

  "dsa-strings": {
    title: "DSA Strings",
    explanation:
      "String problems are extremely common in placement coding rounds.",
    points: [
      "Character frequency.",
      "Two pointers.",
      "Sliding window.",
      "Palindrome.",
      "Anagram."
    ],
    example: `String s = "level";

String reversed =
    new StringBuilder(s)
        .reverse()
        .toString();`,
    interview: [
      "How do you check palindrome?",
      "How do you find character frequency?"
    ],
    practice: [
      "Valid palindrome.",
      "Valid anagram.",
      "Longest substring without repeating characters."
    ]
  }
};

export default function Learning() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const lesson = topic ? lessons[topic] : undefined;

  if (!lesson) {
    return (
      <Layout>
        <div className="bg-slate-900 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-red-400">
            Lesson Not Found
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 px-5 py-3 rounded-lg mt-6"
          >
            ← Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-900 rounded-xl p-8">

        <button
          onClick={() => navigate(-1)}
          className="text-blue-400 mb-6"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-blue-400">
          {lesson.title}
        </h1>

        <p className="text-gray-300 text-lg mt-5">
          {lesson.explanation}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          📌 Key Concepts
        </h2>

        <div className="space-y-3">
          {lesson.points.map((point, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg"
            >
              {point}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          💻 Example
        </h2>

        <pre className="bg-black p-5 rounded-lg overflow-x-auto text-green-400">
          <code>{lesson.example}</code>
        </pre>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          🎯 Interview Questions
        </h2>

        <div className="space-y-3">
          {lesson.interview.map((question, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg"
            >
              <span className="text-blue-400">
                Q{index + 1}.
              </span>{" "}
              {question}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          📝 Practice
        </h2>

        <div className="space-y-3">
          {lesson.practice.map((question, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg"
            >
              <span className="text-green-400">
                {index + 1}.
              </span>{" "}
              {question}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg mt-8"
        >
          ✅ Complete Topic
        </button>

      </div>
    </Layout>
  );
}