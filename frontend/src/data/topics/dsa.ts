export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface DSAProblemDetail {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern: string;
  problemStatement: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hint1: string;
  hint2: string;
  approach: string;
  starterCodeJava: string;
  solutionJava: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: TestCase[];
}

export const dsaProblemBank: DSAProblemDetail[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hashing Lookup",
    problemStatement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hint1: "A brute force search checks all pairs in O(n²). Can you find the complement (target - nums[i]) faster?",
    hint2: "Use a HashMap to store values seen so far along with their indices. When you check an element, see if (target - num) is already in the map.",
    approach:
      "Iterate through the array while maintaining a HashMap where keys are numbers and values are their array indices. For each number x, compute complement = target - x. If the complement exists in the map, return [map.get(complement), current_index]. Otherwise, put x and its index into the map.",
    starterCodeJava: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    solutionJava: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
    timeComplexity: "O(n) — single pass with O(1) hash map lookups.",
    spaceComplexity: "O(n) — for storing up to n elements in the hash map.",
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expectedOutput: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expectedOutput: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expectedOutput: "[0, 1]" }
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    pattern: "Matching Parentheses / LIFO",
    problemStatement:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hint1: "Notice the LIFO property: the last bracket opened must be the first one closed.",
    hint2: "Push opening brackets onto a Stack. When a closing bracket arrives, verify that the stack is non-empty and the top matches.",
    approach:
      "Initialize an ArrayDeque or Stack of characters. Iterate through the string. For '(', '{', '[', push the matching closing bracket onto the stack. For a closing bracket, pop the stack and verify equality. If the stack is empty at that point or mismatched, return false. Finally, return stack.isEmpty().",
    starterCodeJava: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
    solutionJava: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    timeComplexity: "O(n) — single pass through the string of length n.",
    spaceComplexity: "O(n) — for stack storage in the worst case (all opening brackets).",
    testCases: [
      { input: 's = "()"', expectedOutput: "true" },
      { input: 's = "()[]{}"', expectedOutput: "true" },
      { input: 's = "([)]"', expectedOutput: "false" }
    ]
  },
  {
    id: "best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays & Dynamic Programming",
    pattern: "Single-Pass Greedy / Running Minimum",
    problemStatement:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: [
      {
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      { input: "prices = [7, 6, 4, 3, 1]", output: "0" }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    hint1: "You cannot sell before you buy. So at each day, what is the best possible day in the past to have bought?",
    hint2: "Track the minimum price seen so far and update max profit with prices[i] - minPrice.",
    approach:
      "Maintain two variables: minPrice initialized to Integer.MAX_VALUE and maxProfit initialized to 0. As you iterate through prices, update minPrice = min(minPrice, currentPrice). Then calculate currentProfit = currentPrice - minPrice and update maxProfit = max(maxProfit, currentProfit).",
    starterCodeJava: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
    timeComplexity: "O(n) — single iteration through prices array.",
    spaceComplexity: "O(1) — constant auxiliary space.",
    testCases: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", expectedOutput: "5" },
      { input: "prices = [7, 6, 4, 3, 1]", expectedOutput: "0" }
    ]
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    pattern: "Kadane's Algorithm",
    problemStatement:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6."
      },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5, 4, -1, 7, 8]", output: "23" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hint1: "If the running sum becomes negative, adding it to the next element only degrades that element. Should you start a fresh subarray?",
    hint2: "Kadane's rule: currentSum = max(num, currentSum + num).",
    approach:
      "At each element x, decide whether to append x to the existing subarray or start a new subarray beginning at x. Keep a global variable maxSum initialized to nums[0]. Update currentSum = max(x, currentSum + x) and maxSum = max(maxSum, currentSum).",
    starterCodeJava: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
    timeComplexity: "O(n) — single pass Kadane's algorithm.",
    spaceComplexity: "O(1) — constant space.",
    testCases: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", expectedOutput: "6" },
      { input: "nums = [1]", expectedOutput: "1" },
      { input: "nums = [5, 4, -1, 7, 8]", expectedOutput: "23" }
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    pattern: "Search Space Halving",
    problemStatement:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    hint1: "Because nums is sorted, compare target with the middle element.",
    hint2: "Prevent integer overflow when calculating mid: mid = low + (high - low) / 2.",
    approach:
      "Maintain two pointers: low = 0 and high = nums.length - 1. While low <= high, compute mid = low + (high - low) / 2. If nums[mid] == target, return mid. If nums[mid] < target, search right (low = mid + 1). If nums[mid] > target, search left (high = mid - 1). Return -1 if not found.",
    starterCodeJava: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`,
    solutionJava: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    timeComplexity: "O(log n) — search space halved at each step.",
    spaceComplexity: "O(1) — iterative constant space.",
    testCases: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", expectedOutput: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", expectedOutput: "-1" }
    ]
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "3-Pointer Inversion",
    problemStatement:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" },
      { input: "head = [1, 2]", output: "[2, 1]" },
      { input: "head = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hint1: "Think about previous, current, and next pointers.",
    hint2: "Save current.next before reversing current.next to point to previous.",
    approach:
      "Initialize prev = null and curr = head. In a loop while curr != null: save nextNode = curr.next. Reverse pointer: curr.next = prev. Advance prev = curr, and curr = nextNode. When loop terminates, prev points to the new head.",
    starterCodeJava: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) { this.val = val; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
    solutionJava: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
}`,
    timeComplexity: "O(n) — single pass visiting every node once.",
    spaceComplexity: "O(1) — in-place pointer manipulation.",
    testCases: [
      { input: "head = [1, 2, 3, 4, 5]", expectedOutput: "[5, 4, 3, 2, 1]" },
      { input: "head = [1, 2]", expectedOutput: "[2, 1]" }
    ]
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Sorting & Arrays",
    pattern: "Interval Overlap / Sorting",
    problemStatement:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        output: "[[1, 6], [8, 10], [15, 18]]",
        explanation: "Since intervals [1, 3] and [2, 6] overlap, merge them into [1, 6]."
      },
      {
        input: "intervals = [[1, 4], [4, 5]]",
        output: "[[1, 5]]"
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    hint1: "Sorting intervals by their starting point makes it so overlapping intervals are strictly adjacent.",
    hint2: "Two sorted intervals [a, b] and [c, d] overlap if c <= b. The merged interval is [a, max(b, d)].",
    approach:
      "Sort intervals by starting time: Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0])). Initialize a result list. For each interval, if the list is empty or current.start > last.end, add it. Otherwise, last.end = max(last.end, current.end).",
    starterCodeJava: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your solution here
        return new int[][]{};
    }
}`,
    solutionJava: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);
        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                current[1] = Math.max(current[1], interval[1]);
            } else {
                current = interval;
                merged.add(current);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
    timeComplexity: "O(n log n) — sorting dominates the runtime.",
    spaceComplexity: "O(n) — for merged result collection.",
    testCases: [
      { input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]", expectedOutput: "[[1, 6], [8, 10], [15, 18]]" },
      { input: "intervals = [[1, 4], [4, 5]]", expectedOutput: "[[1, 5]]" }
    ]
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    pattern: "Variable Sliding Window / Frequency Map",
    problemStatement:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length 3.'
      },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hint1: "Use two pointers [left, right] representing the active valid window.",
    hint2: "Use a map storing character -> last seen index to jump 'left' pointer forward immediately on duplicates.",
    approach:
      "Maintain a window [left, right]. Store the last seen index of characters in a Map<Character, Integer>. As right advances from 0 to s.length()-1: if char s[right] was seen at or after left, advance left = map.get(char) + 1. Update map and maxLength = max(maxLength, right - left + 1).",
    starterCodeJava: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int maxLength = 0;
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}`,
    timeComplexity: "O(n) — both pointers traverse the string at most once.",
    spaceComplexity: "O(min(n, m)) — m is size of alphabet (bounded by 128 for ASCII).",
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: "3" },
      { input: 's = "bbbbb"', expectedOutput: "1" },
      { input: 's = "pwwkew"', expectedOutput: "3" }
    ]
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees & BFS",
    pattern: "Breadth-First Search Queue",
    problemStatement:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3, 9, 20, null, null, 15, 7]", output: "[[3], [9, 20], [15, 7]]" },
      { input: "root = [1]", output: "[[1]]" },
      { input: "root = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    hint1: "Level by level implies BFS. What data structure is standard for BFS?",
    hint2: "Use a Queue. The number of nodes in the current level is queue.size().",
    approach:
      "If root is null return empty list. Initialize a Queue<TreeNode> and add root. While queue is non-empty, record levelSize = queue.size(). Loop levelSize times, popping node, adding its value to the current level list, and pushing its non-null left and right children into the queue.",
    starterCodeJava: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int val) { this.val = val; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    solutionJava: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>(levelSize);
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,
    timeComplexity: "O(n) — visits every tree node exactly once.",
    spaceComplexity: "O(n) — queue holds maximum width of tree (up to n/2 nodes at leaf level).",
    testCases: [
      { input: "root = [3, 9, 20, null, null, 15, 7]", expectedOutput: "[[3], [9, 20], [15, 7]]" },
      { input: "root = [1]", expectedOutput: "[[1]]" }
    ]
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs & Grid Traversal",
    pattern: "DFS / BFS Connected Components",
    problemStatement:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1"
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3"
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    hint1: "Treat the 2D grid as an undirected graph where '1's are nodes connected to 4-directional neighbors.",
    hint2: "Whenever you encounter a '1', increment island count and run a DFS to sink all connected land cells ('1' -> '0').",
    approach:
      "Iterate through each cell (r, c) of the grid. If grid[r][c] == '1', increment count and call dfs(grid, r, c). In dfs, check boundaries; if current cell is '0', return. Mark grid[r][c] = '0' (visited) and recursively explore up, down, left, right.",
    starterCodeJava: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0'; // sink visited land
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
    timeComplexity: "O(m * n) — every cell is visited a constant number of times.",
    spaceComplexity: "O(m * n) — call stack depth in the worst case (grid completely filled with land).",
    testCases: [
      { input: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]', expectedOutput: "2" },
      { input: 'grid = [["0","0"],["0","0"]]', expectedOutput: "0" }
    ]
  },
  {
    id: "knapsack-01",
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    pattern: "Pick / Don't Pick DP",
    problemStatement:
      "Given weights and values of n items, and a knapsack of capacity W, find the maximum value that can be put into the knapsack such that total weight does not exceed W. Each item can be picked at most once (0/1).",
    examples: [
      {
        input: "values = [60, 100, 120], weights = [10, 20, 30], W = 50",
        output: "220",
        explanation: "Pick item 2 and item 3 with total weight 20 + 30 = 50, value = 100 + 120 = 220."
      }
    ],
    constraints: [
      "1 <= n <= 1000",
      "1 <= W <= 1000",
      "1 <= weights[i], values[i] <= 10^4"
    ],
    hint1: "For each item, you have 2 choices: include it (if weight permits) or exclude it.",
    hint2: "Can you optimize the 2D DP table dp[n+1][W+1] into a 1D array by iterating weight backwards?",
    approach:
      "Use 1D DP array of size W + 1. For each item (val, wt), iterate backwards from W down to wt: dp[w] = max(dp[w], dp[w - wt] + val). Iterating backwards ensures each item is used at most once.",
    starterCodeJava: `class Solution {
    public int knapSack(int W, int[] weights, int[] values, int n) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int knapSack(int W, int[] weights, int[] values, int n) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < n; i++) {
            int wt = weights[i];
            int val = values[i];
            for (int w = W; w >= wt; w--) {
                dp[w] = Math.max(dp[w], dp[w - wt] + val);
            }
        }
        return dp[W];
    }
}`,
    timeComplexity: "O(n * W) — pseudo-polynomial DP runtime.",
    spaceComplexity: "O(W) — space optimized 1D DP array.",
    testCases: [
      { input: "W = 50, weights = [10, 20, 30], values = [60, 100, 120], n = 3", expectedOutput: "220" },
      { input: "W = 4, weights = [4, 5, 1], values = [1, 2, 3], n = 3", expectedOutput: "3" }
    ]
  },
  {
    id: "min-add-parentheses",
    title: "Minimum Add to Make Parentheses Valid",
    difficulty: "Medium",
    topic: "Stack / Greedy",
    pattern: "Balance Tracking Counter",
    problemStatement:
      "A parentheses string is valid if and only if:\n1. It is the empty string,\n2. It can be written as AB (A concatenated with B), where A and B are valid strings, or\n3. It can be written as (A), where A is a valid string.\n\nYou are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string. Return the minimum number of moves required to make s valid.",
    examples: [
      { input: 's = "())"', output: "1" },
      { input: 's = "((("', output: "3" }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s[i] is either '(' or ')'."
    ],
    hint1: "You do not need a full Stack structure. Can you solve this using two integer counters?",
    hint2: "Track openCount for unmatched '(' and neededCount for closing brackets with no matching open bracket.",
    approach:
      "Maintain openCount = 0 and addedCount = 0. Iterate through each character: if '(', increment openCount. If ')', if openCount > 0 decrement openCount; otherwise increment addedCount. Finally, return addedCount + openCount.",
    starterCodeJava: `class Solution {
    public int minAddToMakeValid(String s) {
        // Write your solution here
        return 0;
    }
}`,
    solutionJava: `class Solution {
    public int minAddToMakeValid(String s) {
        int openCount = 0;
        int addedCount = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                openCount++;
            } else {
                if (openCount > 0) {
                    openCount--;
                } else {
                    addedCount++;
                }
            }
        }
        return addedCount + openCount;
    }
}`,
    timeComplexity: "O(n) — single pass through the string.",
    spaceComplexity: "O(1) — two integer counters.",
    testCases: [
      { input: 's = "())"', expectedOutput: "1" },
      { input: 's = "((("', expectedOutput: "3" },
      { input: 's = "()"', expectedOutput: "0" }
    ]
  }
];