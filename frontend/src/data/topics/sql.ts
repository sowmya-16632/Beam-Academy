export interface SQLTopic {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
  exampleQuery: string;
  practicalUse: string;
  keyPoints: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  practiceQuestions: string[];
}

export const sqlCurriculum: SQLTopic[] = [
  {
    id: "select",
    title: "SELECT & Column Projection",
    difficulty: "Easy",
    explanation:
      "The SELECT statement is the foundational SQL command to retrieve rows and columns from one or more database tables.",
    exampleQuery: `SELECT first_name, last_name, email, salary
FROM employees;`,
    practicalUse:
      "Extracting user profiles, product catalogs, and dashboard statistics.",
    keyPoints: [
      "Avoid 'SELECT *' in production to minimize memory and network bandwidth.",
      "Column aliases ('AS alias_name') enhance readability.",
      "Expressions can calculate derived fields directly (e.g., salary * 1.1 AS revised_salary)."
    ],
    interviewQuestions: [
      {
        question: "Why should you avoid using SELECT * in production queries?",
        answer: "1. Transmits unnecessary data over the network. 2. Prevents the database from utilizing covering indexes. 3. Can break application code if table schemas change."
      }
    ],
    practiceQuestions: [
      "Select the names and annualized salaries of all active employees.",
      "Write a query selecting employee ID and full name by concatenating first and last names."
    ]
  },
  {
    id: "where",
    title: "WHERE Clause & Filtering",
    difficulty: "Easy",
    explanation:
      "The WHERE clause filters rows before any grouping or aggregation takes place, using comparison, logical, and range operators.",
    exampleQuery: `SELECT id, name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 80000
  AND status = 'ACTIVE';`,
    practicalUse:
      "Finding active users, orders placed within a date range, or products in stock.",
    keyPoints: [
      "WHERE evaluates before GROUP BY and HAVING.",
      "Use 'IS NULL' and 'IS NOT NULL' because 'NULL = NULL' evaluates to UNKNOWN.",
      "Operators include: =, !=, <, >, BETWEEN, IN, LIKE, NOT."
    ],
    interviewQuestions: [
      {
        question: "How does SQL handle NULL values in WHERE clauses?",
        answer: "SQL uses three-valued logic (TRUE, FALSE, UNKNOWN). Comparisons with NULL (like salary = NULL) evaluate to UNKNOWN, which WHERE treats as FALSE. You must explicitly use 'IS NULL' or 'IS NOT NULL'."
      }
    ],
    practiceQuestions: [
      "Retrieve all employees whose email contains '@beamacademy.com'.",
      "Find orders with total_amount between 500 and 2000 placed in 2024."
    ]
  },
  {
    id: "order-by",
    title: "ORDER BY & Result Sorting",
    difficulty: "Easy",
    explanation:
      "ORDER BY sorts output records in ascending (ASC, default) or descending (DESC) order based on one or more columns.",
    exampleQuery: `SELECT product_name, price, stock_quantity
FROM products
ORDER BY price DESC, stock_quantity ASC;`,
    practicalUse:
      "Displaying top-earning employees, latest transactions, or sorted leaderboards.",
    keyPoints: [
      "Sorting without an index requires an in-memory or on-disk FileSort operation.",
      "Can sort by multiple columns with mixed ASC/DESC order.",
      "NULL values sort first in ASC in MySQL/Oracle by default or can be customized."
    ],
    interviewQuestions: [
      {
        question: "What is the performance implication of ORDER BY without an index?",
        answer: "If the sorting column does not have a suitable B-Tree index, the database engine must load all matching rows into memory (or temporary disk buffers) to execute a FileSort, significantly increasing query execution time."
      }
    ],
    practiceQuestions: [
      "List the top 5 highest paid software engineers.",
      "Sort orders by creation date descending with NULL delivery dates placed last."
    ]
  },
  {
    id: "distinct",
    title: "DISTINCT & Duplicate Elimination",
    difficulty: "Easy",
    explanation:
      "DISTINCT removes duplicate rows from the query result set across all projected columns.",
    exampleQuery: `SELECT DISTINCT department_id, job_title
FROM employees;`,
    practicalUse:
      "Extracting unique country list of registered users or active job roles.",
    keyPoints: [
      "DISTINCT applies across all columns selected, not just the first column.",
      "Can degrade performance on huge tables as it requires sorting or temporary hash tables."
    ],
    interviewQuestions: [
      {
        question: "Difference between DISTINCT and GROUP BY?",
        answer: "DISTINCT eliminates duplicate rows from the final result set. GROUP BY groups rows for aggregate calculations (e.g., SUM, COUNT). While a simple GROUP BY without aggregates behaves like DISTINCT, GROUP BY is intended for aggregation."
      }
    ],
    practiceQuestions: [
      "Find all unique departments represented in the company."
    ]
  },
  {
    id: "aggregate-functions",
    title: "Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)",
    difficulty: "Easy",
    explanation:
      "Aggregate functions perform a calculation on a set of values and return a single scalar value. They automatically ignore NULL values (except COUNT(*)).",
    exampleQuery: `SELECT
    COUNT(*) AS total_employees,
    AVG(salary) AS average_salary,
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary,
    SUM(salary) AS total_payroll
FROM employees;`,
    practicalUse:
      "KPI dashboards, monthly revenue totals, and payroll metrics.",
    keyPoints: [
      "COUNT(*) counts all rows including NULLs.",
      "COUNT(column_name) counts only non-NULL entries in that column.",
      "COUNT(DISTINCT column_name) counts unique non-NULL entries."
    ],
    interviewQuestions: [
      {
        question: "What is the difference between COUNT(*) and COUNT(column_name)?",
        answer: "COUNT(*) returns the count of all rows in the table matching the WHERE condition, including rows where some columns are NULL. COUNT(column_name) returns only the count of rows where that specific column is NOT NULL."
      }
    ],
    practiceQuestions: [
      "Calculate the average and maximum project budget across all completed projects."
    ]
  },
  {
    id: "group-by",
    title: "GROUP BY & Bucket Aggregation",
    difficulty: "Medium",
    explanation:
      "GROUP BY clusters rows that have identical values in specified columns into summary rows for aggregate functions.",
    exampleQuery: `SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;`,
    practicalUse:
      "Department-wise salary expense, monthly revenue breakdown, category-wise sales.",
    keyPoints: [
      "Every non-aggregated column in the SELECT clause MUST appear in the GROUP BY clause.",
      "Logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
    ],
    interviewQuestions: [
      {
        question: "What is the SQL query execution order for GROUP BY?",
        answer: "The database executes in this order: 1. FROM/JOIN, 2. WHERE, 3. GROUP BY, 4. HAVING, 5. SELECT, 6. DISTINCT, 7. ORDER BY, 8. LIMIT."
      }
    ],
    practiceQuestions: [
      "Find total sales amount and number of orders grouped by customer_id."
    ]
  },
  {
    id: "having",
    title: "HAVING & Filter on Aggregates",
    difficulty: "Medium",
    explanation:
      "The HAVING clause filters grouped records after aggregate functions have been calculated. WHERE cannot filter aggregate functions directly.",
    exampleQuery: `SELECT department_id, AVG(salary) AS avg_sal
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 75000;`,
    practicalUse:
      "Finding departments with high average salary or customers with more than 5 orders.",
    keyPoints: [
      "WHERE filters individual rows before grouping; HAVING filters groups after aggregation.",
      "Never put row-level filters in HAVING when they could have been evaluated in WHERE."
    ],
    interviewQuestions: [
      {
        question: "Difference between WHERE and HAVING clause?",
        answer: "WHERE filters individual rows before grouping and cannot refer to aggregate functions. HAVING filters aggregated groups after GROUP BY and evaluates aggregate conditions (e.g. COUNT(*) > 5)."
      }
    ],
    practiceQuestions: [
      "Find all categories with more than 10 products having total inventory value above $50,000."
    ]
  },
  {
    id: "joins",
    title: "JOINS (INNER, LEFT, RIGHT, FULL, SELF, CROSS)",
    difficulty: "Medium",
    explanation:
      "JOINS combine columns from one or more tables based on a related column relationship (foreign key / primary key).",
    exampleQuery: `SELECT e.id, e.name, d.department_name, m.name AS manager_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;`,
    practicalUse:
      "Connecting orders to customers, employees to departments, comments to blog posts.",
    keyPoints: [
      "INNER JOIN: rows with matching keys in both tables.",
      "LEFT JOIN: all rows from the left table + matching rows from right (or NULL).",
      "SELF JOIN: joining a table to itself (hierarchical data, managers, organizational charts).",
      "CROSS JOIN: Cartesian product of both tables."
    ],
    interviewQuestions: [
      {
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        answer: "INNER JOIN returns only rows where the join condition matches in both tables. LEFT JOIN returns all rows from the left table; if no match exists in the right table, columns from the right table are filled with NULL."
      },
      {
        question: "What is a SELF JOIN and when would you use it?",
        answer: "A SELF JOIN joins a table to itself using table aliases. Common use cases include finding an employee's manager in the same employee table or comparing rows within the same table."
      }
    ],
    practiceQuestions: [
      "Find all customers who have never placed an order using a LEFT JOIN and NULL check.",
      "Write a SELF JOIN query to list employees and their respective manager names."
    ]
  },
  {
    id: "subqueries",
    title: "Subqueries & Correlated Queries",
    difficulty: "Medium",
    explanation:
      "A subquery is a nested query enclosed in parentheses inside another query. A correlated subquery depends on values from the outer query and executes once per outer row.",
    exampleQuery: `SELECT name, salary, department_id
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);`,
    practicalUse:
      "Finding above-average earners in each department or existence checks using EXISTS.",
    keyPoints: [
      "Single-row subqueries use scalar operators (=, <, >).",
      "Multi-row subqueries use IN, ANY, ALL, EXISTS.",
      "EXISTS is often faster than IN for large subqueries because it stops scanning upon finding the first match."
    ],
    interviewQuestions: [
      {
        question: "What is a Correlated Subquery and why can it be slow?",
        answer: "A correlated subquery references columns from the outer query, requiring the database engine to execute the subquery repeatedly for every single row evaluated by the outer query (O(N*M)), rather than executing once."
      }
    ],
    practiceQuestions: [
      "Find the second highest salary using a subquery.",
      "Find all employees earning more than the overall company average."
    ]
  },
  {
    id: "ctes",
    title: "Common Table Expressions (CTEs & Recursive CTEs)",
    difficulty: "Medium",
    explanation:
      "A CTE is a temporary named result set defined using the WITH clause. It simplifies complex nested queries and can be recursive for hierarchical tree structures.",
    exampleQuery: `WITH HighSpenders AS (
    SELECT customer_id, SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) > 10000
)
SELECT c.name, h.total_spent
FROM customers c
JOIN HighSpenders h ON c.id = h.customer_id;`,
    practicalUse:
      "Multi-step report pipelines, organizational tree traversal, pagination with window functions.",
    keyPoints: [
      "Readable alternative to deep subquery nesting.",
      "Recursive CTEs allow querying graphs and organizational hierarchies (e.g. employee -> manager -> VP -> CEO).",
      "Available in MySQL 8.0+, PostgreSQL, and SQL Server."
    ],
    interviewQuestions: [
      {
        question: "What is the benefit of a CTE over a Subquery?",
        answer: "CTEs make SQL dramatically more readable and maintainable by breaking complex logic into sequential blocks. A CTE can also be referenced multiple times within the same query without re-evaluating the subquery text."
      }
    ],
    practiceQuestions: [
      "Write a CTE to compute the 2nd highest salary in each department."
    ]
  },
  {
    id: "views",
    title: "Views & Materialized Views",
    difficulty: "Easy",
    explanation:
      "A View is a stored virtual table defined by a SQL query. It does not store physical data; rather, it runs the underlying query whenever queried.",
    exampleQuery: `CREATE VIEW ActiveEmployeeDetails AS
SELECT e.id, e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.status = 'ACTIVE';`,
    practicalUse:
      "Security abstraction (hiding sensitive columns like SSN/salary), simplifying recurring joins.",
    keyPoints: [
      "Views add a layer of abstraction and security.",
      "Standard views do not consume storage (virtual tables).",
      "Materialized views (in PostgreSQL/Oracle) store physical snapshots and require refreshing."
    ],
    interviewQuestions: [
      {
        question: "What is the difference between a View and a Table?",
        answer: "A table physically stores data on disk. A view is a stored query that generates virtual results dynamically on demand. Querying a view executes its underlying definition."
      }
    ],
    practiceQuestions: [
      "Create a view showing department names and their total employee count."
    ]
  },
  {
    id: "constraints",
    title: "Data Integrity & Constraints",
    difficulty: "Easy",
    explanation:
      "Constraints enforce data integrity rules on columns: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and DEFAULT.",
    exampleQuery: `CREATE TABLE accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT chk_positive_balance CHECK (balance >= 0.00)
);`,
    practicalUse:
      "Preventing orphan records, negative balances, duplicate emails, and corrupted state.",
    keyPoints: [
      "PRIMARY KEY enforces uniqueness and NOT NULL, automatically creating a clustered index.",
      "FOREIGN KEY guarantees referential integrity (ON DELETE CASCADE / SET NULL).",
      "CHECK constraints validate business rules at the schema level."
    ],
    interviewQuestions: [
      {
        question: "PRIMARY KEY vs UNIQUE KEY?",
        answer: "A table can have only ONE Primary Key, and it cannot accept NULL values. A table can have MULTIPLE Unique Keys, and Unique columns can typically accept NULL values (depending on RDBMS)."
      }
    ],
    practiceQuestions: [
      "Design an enrollment table with a composite primary key on (student_id, course_id)."
    ]
  },
  {
    id: "normalization",
    title: "Database Normalization (1NF, 2NF, 3NF, BCNF)",
    difficulty: "Medium",
    explanation:
      "Normalization organizes schema relations to reduce data redundancy, eliminate update/insert/delete anomalies, and ensure data integrity.",
    exampleQuery: `-- 3NF split: Separate Department entity from Employee
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);`,
    practicalUse:
      "Designing clean OLTP schemas that avoid data duplication and inconsistencies.",
    keyPoints: [
      "1NF: Atomic values (no repeating groups/comma lists), unique rows.",
      "2NF: In 1NF and no partial dependency on composite primary key.",
      "3NF: In 2NF and no transitive dependency (non-key attributes depend only on primary key).",
      "Denormalization is sometimes used in OLAP/Data Warehouses to speed up analytical read queries."
    ],
    interviewQuestions: [
      {
        question: "Explain 1NF, 2NF, and 3NF simply.",
        answer: "1NF: Each column must hold atomic (indivisible) values. 2NF: No partial dependency (every non-key column depends on the whole primary key). 3NF: No transitive dependency (non-key columns depend only on the primary key, not on another non-key column)."
      }
    ],
    practiceQuestions: [
      "Normalize a table containing (OrderID, CustomerName, CustomerAddress, ProductID, ProductName, Quantity) into 3NF."
    ]
  },
  {
    id: "indexes",
    title: "Indexes & B-Tree / Hash Mechanics",
    difficulty: "Hard",
    explanation:
      "Indexes are specialized data structures (typically B+ Trees) that allow the database engine to find specific rows in O(log n) time without scanning the entire table.",
    exampleQuery: `CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);`,
    practicalUse:
      "Accelerating WHERE lookups, JOIN conditions, and ORDER BY sort operations.",
    keyPoints: [
      "Clustered Index: Determines the physical order of data on disk (InnoDB uses PRIMARY KEY).",
      "Non-Clustered (Secondary) Index: Separate B+ Tree whose leaf nodes point to the clustered index key.",
      "Composite Index: Follows the leftmost prefix rule.",
      "Indexes speed up reads but slow down INSERT, UPDATE, and DELETE operations."
    ],
    interviewQuestions: [
      {
        question: "What is the Leftmost Prefix Rule in Composite Indexes?",
        answer: "If an index is defined on (A, B, C), queries filtering by (A), (A, B), or (A, B, C) can utilize the index. Queries filtering only on (B) or (C) cannot use this index because B-Tree traversal starts from the leftmost key."
      },
      {
        question: "Clustered vs Non-Clustered Index?",
        answer: "A clustered index physically sorts table rows on disk (only one per table, usually PK). A non-clustered index is an auxiliary B-Tree structure storing the indexed column and a pointer to the clustered record."
      }
    ],
    practiceQuestions: [
      "Given a query with WHERE status = 'PENDING' ORDER BY created_at DESC, what index would you build?"
    ]
  },
  {
    id: "transactions",
    title: "Transactions & ACID Properties",
    difficulty: "Hard",
    explanation:
      "A transaction is an atomic unit of work. Relational databases guarantee ACID properties: Atomicity, Consistency, Isolation, and Durability.",
    exampleQuery: `START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 101;
UPDATE accounts SET balance = balance + 500 WHERE id = 102;
COMMIT; -- Or ROLLBACK on error;`,
    practicalUse:
      "Bank money transfers, inventory allocation during e-commerce checkout.",
    keyPoints: [
      "Atomicity: All operations succeed or all are rolled back.",
      "Consistency: Database transitions from one valid state to another.",
      "Isolation: Concurrent transactions do not interfere (Read Uncommitted, Read Committed, Repeatable Read, Serializable).",
      "Durability: Committed data survives crashes via Write-Ahead Logging (WAL)."
    ],
    interviewQuestions: [
      {
        question: "Explain the 4 Transaction Isolation Levels and their anomalies.",
        answer: "1. Read Uncommitted (Dirty Reads possible). 2. Read Committed (Non-repeatable reads possible). 3. Repeatable Read (Default in MySQL InnoDB; phantom reads handled via MVCC and Next-Key locks). 4. Serializable (Full isolation via locking)."
      }
    ],
    practiceQuestions: [
      "Explain how Deadlocks occur in transactions and how InnoDB detects them."
    ]
  },
  {
    id: "query-optimization",
    title: "Query Optimization & EXPLAIN Plans",
    difficulty: "Hard",
    explanation:
      "Query optimization involves writing performant queries and analyzing execution plans using EXPLAIN to identify full table scans, temporary tables, and missing indexes.",
    exampleQuery: `EXPLAIN ANALYZE
SELECT o.id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.order_date >= '2024-01-01';`,
    practicalUse:
      "Fixing production query timeouts, reducing CPU utilization, and tuning slow queries.",
    keyPoints: [
      "EXPLAIN reveals join types (system, const, eq_ref, ref, range, index, ALL).",
      "'type: ALL' indicates a full table scan — investigate adding an index.",
      "Avoid functions on indexed columns in WHERE clauses (e.g., WHERE YEAR(created_at) = 2024 invalidates index usage)."
    ],
    interviewQuestions: [
      {
        question: "Why does 'WHERE UPPER(email) = UPPER(?)' fail to use an index in MySQL?",
        answer: "Applying a function to an indexed column prevents the B-Tree from performing binary search because the engine must compute the function for every row. Solution: store normalized lowercase emails or use a generated column index."
      }
    ],
    practiceQuestions: [
      "Rewrite a slow query using IN (SELECT ...) to an equivalent JOIN or EXISTS."
    ]
  }
];
