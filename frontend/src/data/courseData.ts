export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

export const courses: Course[] = [
  {
    id: "java",
    title: "Java",
    icon: "☕",
    topics: [
      {
        id: "java-basics",
        title: "Java Basics",
        description: "JDK, JRE, JVM, variables, data types, operators and basic syntax.",
        questions: [
          "What is Java?",
          "Difference between JDK, JRE and JVM?",
          "Why is Java platform independent?",
          "What are primitive data types?"
        ]
      },
      {
        id: "control-flow",
        title: "Conditions & Loops",
        description: "if-else, switch, for, while and do-while loops.",
        questions: [
          "Difference between while and do-while?",
          "When would you use switch?",
          "Difference between break and continue?"
        ]
      },
      {
        id: "arrays",
        title: "Arrays",
        description: "One-dimensional and two-dimensional arrays.",
        questions: [
          "How do you find the maximum element?",
          "How do you reverse an array?",
          "What is the time complexity of accessing an array element?"
        ]
      },
      {
        id: "strings",
        title: "Strings",
        description: "String, StringBuilder and StringBuffer.",
        questions: [
          "Why is String immutable?",
          "String vs StringBuilder?",
          "What is the String pool?"
        ]
      },
      {
        id: "oop",
        title: "OOP",
        description: "Encapsulation, inheritance, polymorphism and abstraction.",
        questions: [
          "What are the four pillars of OOP?",
          "Overloading vs overriding?",
          "Abstract class vs interface?",
          "What is encapsulation?"
        ]
      },
      {
        id: "collections",
        title: "Collections",
        description: "List, Set, Map, Queue and their implementations.",
        questions: [
          "ArrayList vs LinkedList?",
          "HashMap vs HashSet?",
          "How does HashMap work internally?",
          "HashMap vs TreeMap?"
        ]
      },
      {
        id: "exceptions",
        title: "Exception Handling",
        description: "try, catch, finally, throw and throws.",
        questions: [
          "Checked vs unchecked exceptions?",
          "throw vs throws?",
          "Why is finally used?"
        ]
      },
      {
        id: "java-8",
        title: "Java 8+",
        description: "Lambda expressions, functional interfaces and streams.",
        questions: [
          "What is a lambda expression?",
          "What is a functional interface?",
          "What is Stream API?"
        ]
      },
      {
        id: "multithreading",
        title: "Multithreading",
        description: "Threads, synchronization and concurrency.",
        questions: [
          "Process vs thread?",
          "What is synchronization?",
          "What is deadlock?",
          "How can deadlock be prevented?"
        ]
      },
      {
        id: "jdbc",
        title: "JDBC",
        description: "Connecting Java applications to databases.",
        questions: [
          "What is JDBC?",
          "What are the steps to connect Java with a database?",
          "Statement vs PreparedStatement?"
        ]
      },
      {
        id: "spring-boot",
        title: "Spring Boot",
        description: "REST APIs, dependency injection, JPA and backend development.",
        questions: [
          "What is Spring Boot?",
          "What is dependency injection?",
          "What is REST?",
          "What is JPA?",
          "Spring vs Spring Boot?"
        ]
      }
    ]
  },

  {
    id: "sql",
    title: "SQL",
    icon: "🗄️",
    topics: [
      {
        id: "select",
        title: "SELECT",
        description: "Retrieve data from database tables.",
        questions: [
          "What is SELECT?",
          "How do you select specific columns?",
          "What is DISTINCT?"
        ]
      },
      {
        id: "where",
        title: "WHERE",
        description: "Filter records using conditions.",
        questions: [
          "WHERE vs HAVING?",
          "How do AND and OR work?"
        ]
      },
      {
        id: "functions",
        title: "SQL Functions",
        description: "Single-row and aggregate functions.",
        questions: [
          "COUNT vs COUNT(*)?",
          "What are aggregate functions?",
          "What is NVL in Oracle?"
        ]
      },
      {
        id: "group-by",
        title: "GROUP BY",
        description: "Group rows for aggregate calculations.",
        questions: [
          "Why is GROUP BY used?",
          "Can GROUP BY be used without aggregate functions?"
        ]
      },
      {
        id: "having",
        title: "HAVING",
        description: "Filter grouped records.",
        questions: [
          "WHERE vs HAVING?",
          "Why can't aggregate conditions normally be placed in WHERE?"
        ]
      },
      {
        id: "joins",
        title: "JOINS",
        description: "Combine data from multiple tables.",
        questions: [
          "INNER JOIN vs LEFT JOIN?",
          "What is SELF JOIN?",
          "What is CROSS JOIN?"
        ]
      },
      {
        id: "subqueries",
        title: "Subqueries",
        description: "Queries inside another query.",
        questions: [
          "What is a subquery?",
          "Single-row vs multi-row subquery?",
          "What is a correlated subquery?"
        ]
      },
      {
        id: "set-operators",
        title: "Set Operators",
        description: "UNION, UNION ALL, INTERSECT and MINUS.",
        questions: [
          "UNION vs UNION ALL?",
          "What does INTERSECT do?",
          "What is MINUS in Oracle?"
        ]
      },
      {
        id: "views",
        title: "Views",
        description: "Virtual tables based on queries.",
        questions: [
          "What is a view?",
          "Why are views used?"
        ]
      },
      {
        id: "indexes",
        title: "Indexes",
        description: "Improve database query performance.",
        questions: [
          "What is an index?",
          "Index scan vs full table scan?",
          "When can an index hurt performance?"
        ]
      },
      {
        id: "normalization",
        title: "Normalization",
        description: "1NF, 2NF, 3NF and BCNF.",
        questions: [
          "Why is normalization used?",
          "Explain 1NF.",
          "Explain 2NF.",
          "Explain 3NF."
        ]
      },
      {
        id: "transactions",
        title: "Transactions",
        description: "COMMIT, ROLLBACK, SAVEPOINT and ACID.",
        questions: [
          "What is a transaction?",
          "What are ACID properties?",
          "COMMIT vs ROLLBACK?"
        ]
      }
    ]
  },

  {
    id: "dsa",
    title: "DSA",
    icon: "🧠",
    topics: [
      {
        id: "complexity",
        title: "Time & Space Complexity",
        description: "Big O, Big Omega and Big Theta.",
        questions: [
          "What is Big O?",
          "What is O(1)?",
          "What is O(n)?",
          "What is O(log n)?"
        ]
      },
      {
        id: "dsa-arrays",
        title: "Arrays",
        description: "Array traversal, searching and common patterns.",
        questions: [
          "Find maximum element.",
          "Reverse an array.",
          "Find duplicate elements.",
          "Two Sum."
        ]
      },
      {
        id: "hashing",
        title: "Hashing",
        description: "HashMap and frequency-based problem solving.",
        questions: [
          "What is hashing?",
          "How does HashMap work?",
          "When should you use a HashMap?"
        ]
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        description: "Solve array and string problems efficiently.",
        questions: [
          "What is the two-pointer technique?",
          "When is it useful?"
        ]
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        description: "Efficiently process contiguous ranges.",
        questions: [
          "What is sliding window?",
          "Fixed vs variable window?"
        ]
      },
      {
        id: "binary-search",
        title: "Binary Search",
        description: "Search sorted data in logarithmic time.",
        questions: [
          "What is binary search?",
          "Why is its complexity O(log n)?",
          "Find first occurrence of an element."
        ]
      },
      {
        id: "linked-list",
        title: "Linked List",
        description: "Singly and doubly linked lists.",
        questions: [
          "Array vs Linked List?",
          "Reverse a linked list.",
          "Detect a cycle."
        ]
      },
      {
        id: "stack",
        title: "Stack",
        description: "LIFO data structure and applications.",
        questions: [
          "What is a stack?",
          "Implement stack using array.",
          "Valid Parentheses."
        ]
      },
      {
        id: "queue",
        title: "Queue",
        description: "FIFO data structure and applications.",
        questions: [
          "What is a queue?",
          "Queue vs stack?"
        ]
      },
      {
        id: "trees",
        title: "Trees",
        description: "Binary trees and tree traversal.",
        questions: [
          "What is a binary tree?",
          "Inorder, preorder and postorder?",
          "What is BST?"
        ]
      },
      {
        id: "heap",
        title: "Heap",
        description: "Min heap, max heap and priority queues.",
        questions: [
          "What is a heap?",
          "Min heap vs max heap?",
          "What is PriorityQueue?"
        ]
      },
      {
        id: "graphs",
        title: "Graphs",
        description: "BFS, DFS and graph traversal.",
        questions: [
          "What is a graph?",
          "BFS vs DFS?",
          "Adjacency matrix vs adjacency list?"
        ]
      },
      {
        id: "greedy",
        title: "Greedy Algorithms",
        description: "Make locally optimal choices.",
        questions: [
          "What is a greedy algorithm?",
          "When does greedy work?"
        ]
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        description: "Memoization, tabulation and overlapping subproblems.",
        questions: [
          "What is dynamic programming?",
          "Memoization vs tabulation?",
          "What are overlapping subproblems?"
        ]
      }
    ]
  },

  {
    id: "core-cs",
    title: "Core CS",
    icon: "💻",
    topics: [
      {
        id: "dbms",
        title: "DBMS",
        description: "Database fundamentals, transactions and normalization.",
        questions: [
          "What is DBMS?",
          "DBMS vs RDBMS?",
          "What is a primary key?",
          "What are ACID properties?"
        ]
      },
      {
        id: "os",
        title: "Operating Systems",
        description: "Processes, threads, scheduling, memory and deadlocks.",
        questions: [
          "Process vs thread?",
          "What is CPU scheduling?",
          "What is deadlock?",
          "What is virtual memory?"
        ]
      },
      {
        id: "networks",
        title: "Computer Networks",
        description: "Networking fundamentals used in technical interviews.",
        questions: [
          "What is TCP/IP?",
          "TCP vs UDP?",
          "HTTP vs HTTPS?",
          "What is DNS?"
        ]
      },
      {
        id: "oops",
        title: "OOP Concepts",
        description: "Object-oriented programming concepts for interviews.",
        questions: [
          "What is polymorphism?",
          "What is abstraction?",
          "What is inheritance?"
        ]
      }
    ]
  },

  {
    id: "aptitude",
    title: "Aptitude",
    icon: "🎯",
    topics: [
      {
        id: "percentages",
        title: "Percentages",
        description: "Percentage calculations and placement problems.",
        questions: [
          "Find percentage increase.",
          "Find percentage decrease."
        ]
      },
      {
        id: "profit-loss",
        title: "Profit & Loss",
        description: "Profit, loss, cost price and selling price.",
        questions: [
          "Calculate profit percentage.",
          "Calculate selling price."
        ]
      },
      {
        id: "ratio",
        title: "Ratio & Proportion",
        description: "Ratios and proportional relationships.",
        questions: [
          "Solve ratio problems.",
          "Find missing proportion."
        ]
      },
      {
        id: "time-work",
        title: "Time & Work",
        description: "Work-rate based placement problems.",
        questions: [
          "Solve combined work problems.",
          "Calculate individual work rate."
        ]
      },
      {
        id: "speed",
        title: "Time, Speed & Distance",
        description: "Speed, distance and time problems.",
        questions: [
          "Calculate speed.",
          "Solve train problems."
        ]
      },
      {
        id: "probability",
        title: "Probability",
        description: "Basic probability and placement questions.",
        questions: [
          "What is probability?",
          "Solve simple probability problems."
        ]
      }
    ]
  }
];