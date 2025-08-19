// Application data and configuration
const CONFIG = {
    API_KEY: "YOUR_API_KEY_HERE",
    API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent",
    DB_NAME: "AlgoPrepCacheDB",
    DB_VERSION: 1,
    MAX_RETRIES: 5,
    INITIAL_DELAY: 1000
};

// Icon mapping for categories
const iconMap = {
    'Graph Algorithms': 'network',
    'Dynamic Programming': 'layers',
    'Backtracking': 'undo-2',
    'Sliding Window': 'move-horizontal',
    'Trees and Binary Trees': 'git-branch',
    'Sorting Algorithms': 'arrow-up-down',
    'Searching Algorithms': 'search',
    'Greedy Algorithms': 'trending-up',
    'String Algorithms': 'type',
    'Array and Matrix': 'grid-3x3',
    'Linked Lists': 'link',
    'Stack and Queue': 'layers',
    'Heap and Priority Queue': 'triangle',
    'Binary Search': 'target',
    'Two Pointers': 'move-horizontal',
    'Bit Manipulation': 'binary',
    'Mathematical Algorithms': 'calculator',
    'Design Patterns': 'box',
    'System Design': 'server',
    'Behavioral': 'users'
};

// Algorithm roadmap data structure
const roadmap = [
    {
        title: 'Algorithms',
        children: [
            { 
                title: 'Graph Algorithms', 
                children: [
                    'Graph Representation: Adjacency Matrix', 
                    'Graph Representation: Adjacency List',
                    'Traversal: BFS', 
                    'Traversal: DFS',
                    'Cycle Detection: Undirected Graph',
                    'Cycle Detection: Directed Graph',
                    'Topological Sort: With DFS',
                    'Topological Sort: With BFS (Kahn\'s Algorithm)',
                    "MST: Kruskal's Algorithm", 
                    "MST: Prim's Algorithm",
                    "Shortest Path: Dijkstra's Algorithm",
                    'Shortest Path: Bellman-Ford Algorithm',
                    'Bipartite Graph Checking',
                    "Strongly Connected Components (Kosaraju's)",
                    'Disjoint Set Union (Union-Find)'
                ] 
            },
            {
                title: 'Dynamic Programming',
                children: [
                    'Intro: Memoization vs Tabulation',
                    '1D DP: Fibonacci Sequence',
                    '1D DP: Climbing Stairs',
                    '2D DP: Longest Common Subsequence',
                    '2D DP: 0/1 Knapsack Problem',
                    'DP on Strings: Edit Distance',
                    'DP on Strings: Longest Palindromic Substring',
                    'Unbounded Knapsack',
                    'Coin Change Problem'
                ]
            },
            {
                title: 'Backtracking',
                children: [
                    'Introduction to Backtracking',
                    'Subsets / Power Set',
                    'Permutations',
                    'Combination Sum',
                    'N-Queens Problem',
                    'Sudoku Solver',
                    'Word Search'
                ]
            },
            {
                title: 'Sliding Window',
                children: [
                    'Introduction to Sliding Window',
                    'Fixed Size: Max Sum Subarray of Size K',
                    'Variable Size: Longest Substring with K Distinct Characters',
                    'Variable Size: Smallest Subarray with a Given Sum',
                    'Frequency Counter: Longest Substring Without Repeating Characters',
                    'Frequency Counter: Minimum Window Substring'
                ]
            },
            {
                title: 'Trees and Binary Trees',
                children: [
                    'Tree Terminology and Properties',
                    'Binary Tree Traversals: Inorder, Preorder, Postorder',
                    'Level Order Traversal (BFS)',
                    'Binary Search Tree (BST) Operations',
                    'BST Validation',
                    'Lowest Common Ancestor',
                    'Tree Height and Diameter',
                    'Binary Tree to Doubly Linked List',
                    'Serialize and Deserialize Binary Tree',
                    'AVL Tree Rotations',
                    'Red-Black Tree Properties',
                    'Trie (Prefix Tree)',
                    'Segment Tree',
                    'Binary Indexed Tree (Fenwick Tree)'
                ]
            },
            {
                title: 'Sorting Algorithms',
                children: [
                    'Bubble Sort',
                    'Selection Sort',
                    'Insertion Sort',
                    'Merge Sort',
                    'Quick Sort',
                    'Heap Sort',
                    'Counting Sort',
                    'Radix Sort',
                    'Bucket Sort',
                    'External Sorting',
                    'Stability in Sorting',
                    'Comparison of Sorting Algorithms'
                ]
            },
            {
                title: 'Searching Algorithms',
                children: [
                    'Linear Search',
                    'Binary Search on Sorted Array',
                    'Binary Search on Answer',
                    'Ternary Search',
                    'Exponential Search',
                    'Interpolation Search',
                    'Jump Search',
                    'Search in Rotated Sorted Array',
                    'Find Peak Element',
                    'Search in 2D Matrix'
                ]
            },
            {
                title: 'Greedy Algorithms',
                children: [
                    'Introduction to Greedy Method',
                    'Activity Selection Problem',
                    'Fractional Knapsack',
                    'Job Scheduling with Deadlines',
                    'Huffman Coding',
                    'Minimum Platforms Problem',
                    'Gas Station Problem',
                    'Candy Distribution',
                    'Jump Game',
                    'Meeting Rooms'
                ]
            },
            {
                title: 'String Algorithms',
                children: [
                    'String Matching: Naive Algorithm',
                    'KMP (Knuth-Morris-Pratt) Algorithm',
                    'Rabin-Karp Algorithm',
                    'Z Algorithm',
                    'Boyer-Moore Algorithm',
                    'Longest Common Prefix',
                    'Palindrome Checking',
                    'Anagram Detection',
                    'String Compression',
                    'Regular Expression Matching',
                    'Wildcard Pattern Matching'
                ]
            },
            {
                title: 'Array and Matrix',
                children: [
                    'Array Rotation',
                    'Kadane\'s Algorithm (Maximum Subarray)',
                    'Dutch National Flag Problem',
                    'Missing Number in Array',
                    'Duplicate Elements',
                    'Merge Intervals',
                    'Matrix Multiplication',
                    'Spiral Matrix Traversal',
                    'Rotate Matrix by 90 degrees',
                    'Search in Row-wise and Column-wise Sorted Matrix',
                    'Set Matrix Zeroes',
                    'Largest Rectangle in Histogram'
                ]
            },
            {
                title: 'Linked Lists',
                children: [
                    'Singly Linked List Operations',
                    'Doubly Linked List',
                    'Circular Linked List',
                    'Reverse Linked List',
                    'Merge Two Sorted Lists',
                    'Detect Cycle in Linked List',
                    'Find Middle of Linked List',
                    'Remove Nth Node from End',
                    'Intersection of Two Linked Lists',
                    'Add Two Numbers Represented as Lists',
                    'Clone List with Random Pointers',
                    'LRU Cache Implementation'
                ]
            },
            {
                title: 'Stack and Queue',
                children: [
                    'Stack Implementation using Array/LinkedList',
                    'Queue Implementation using Array/LinkedList',
                    'Circular Queue',
                    'Deque (Double-ended Queue)',
                    'Priority Queue',
                    'Stack using Queues',
                    'Queue using Stacks',
                    'Valid Parentheses',
                    'Next Greater Element',
                    'Largest Rectangle in Histogram',
                    'Sliding Window Maximum',
                    'Expression Evaluation'
                ]
            },
            {
                title: 'Heap and Priority Queue',
                children: [
                    'Binary Heap Properties',
                    'Min Heap and Max Heap',
                    'Heap Sort Algorithm',
                    'K Largest/Smallest Elements',
                    'Merge K Sorted Arrays',
                    'Find Median from Data Stream',
                    'Top K Frequent Elements',
                    'Sliding Window Median',
                    'Build Heap from Array',
                    'Heap as Priority Queue'
                ]
            },
            {
                title: 'Binary Search',
                children: [
                    'Binary Search Template',
                    'Search Insert Position',
                    'Find First and Last Position',
                    'Search in Rotated Array',
                    'Find Minimum in Rotated Array',
                    'Square Root using Binary Search',
                    'Peak Index in Mountain Array',
                    'Koko Eating Bananas',
                    'Capacity to Ship Packages',
                    'Minimize Max Distance to Gas Station'
                ]
            },
            {
                title: 'Two Pointers',
                children: [
                    'Two Sum in Sorted Array',
                    'Three Sum Problem',
                    'Four Sum Problem',
                    'Remove Duplicates from Sorted Array',
                    'Container with Most Water',
                    'Trapping Rain Water',
                    'Valid Palindrome',
                    'Move Zeroes',
                    'Sort Colors (Dutch Flag)',
                    'Intersection of Two Arrays'
                ]
            },
            {
                title: 'Bit Manipulation',
                children: [
                    'Bitwise Operators',
                    'Check if Number is Power of 2',
                    'Count Set Bits',
                    'Find the Odd Occurring Element',
                    'Swap Two Numbers without Temp',
                    'Find Missing Number using XOR',
                    'Reverse Bits',
                    'Add Two Numbers without Arithmetic',
                    'Maximum XOR of Two Numbers',
                    'Subset Generation using Bits'
                ]
            },
            {
                title: 'Mathematical Algorithms',
                children: [
                    'GCD and LCM',
                    'Prime Number Generation (Sieve)',
                    'Fast Exponentiation',
                    'Modular Arithmetic',
                    'Factorial and Combinations',
                    'Fibonacci Sequence Variants',
                    'Pascal\'s Triangle',
                    'Number Theory Basics',
                    'Matrix Exponentiation',
                    'Catalan Numbers'
                ]
            },
            {
                title: 'Design Patterns',
                children: [
                    'Design LRU Cache',
                    'Design LFU Cache',
                    'Design Hash Map',
                    'Design Stack with Min Function',
                    'Design Queue using Stacks',
                    'Design Circular Queue',
                    'Design Twitter Feed',
                    'Design Rate Limiter',
                    'Design Consistent Hashing',
                    'Design Distributed Cache'
                ]
            }
        ]
    },
    {
        title: 'System Design',
        children: [
            {
                title: 'Fundamentals',
                children: [
                    'Scalability Concepts',
                    'Load Balancing',
                    'Caching Strategies',
                    'Database Sharding',
                    'CAP Theorem',
                    'Eventual Consistency',
                    'Microservices vs Monolith',
                    'API Design Best Practices',
                    'Rate Limiting',
                    'Circuit Breaker Pattern'
                ]
            },
            {
                title: 'Storage Systems',
                children: [
                    'SQL vs NoSQL',
                    'Database Indexing',
                    'ACID Properties',
                    'Database Replication',
                    'Distributed Databases',
                    'Data Warehousing',
                    'Message Queues',
                    'File Storage Systems',
                    'CDN (Content Delivery Network)',
                    'Data Partitioning Strategies'
                ]
            },
            {
                title: 'System Architecture',
                children: [
                    'High-Level Architecture Design',
                    'Service-Oriented Architecture',
                    'Event-Driven Architecture',
                    'Serverless Architecture',
                    'Container Orchestration',
                    'Monitoring and Logging',
                    'Security in Distributed Systems',
                    'Disaster Recovery',
                    'Performance Optimization',
                    'Cost Optimization'
                ]
            },
            {
                title: 'Popular System Designs',
                children: [
                    'Design URL Shortener (TinyURL)',
                    'Design Social Media Feed (Twitter)',
                    'Design Chat System (WhatsApp)',
                    'Design Video Streaming (YouTube)',
                    'Design Search Engine (Google)',
                    'Design E-commerce Platform (Amazon)',
                    'Design Ride-sharing Service (Uber)',
                    'Design Payment System (PayPal)',
                    'Design Notification System',
                    'Design Distributed Cache (Redis)',
                    'Design File Storage (Dropbox)',
                    'Design Web Crawler'
                ]
            }
        ]
    },
    {
        title: 'Behavioral',
        children: [
            {
                title: 'Leadership & Management',
                children: [
                    'Leading a Team Successfully',
                    'Influencing Without Authority',
                    'Handling Team Conflicts',
                    'Giving Difficult Feedback',
                    'Management and Leadership Styles',
                    'Motivating Team Members',
                    'Making Tough Decisions',
                    'Managing Underperforming Team Members',
                    'Delegating Important Work',
                    'Prioritizing Competing Demands'
                ]
            },
            {
                title: 'Problem Solving & Innovation',
                children: [
                    'Solving Complex Problems',
                    'Thinking Outside the Box',
                    'Learning New Technologies',
                    'Learning from Failures',
                    'Working with Incomplete Information',
                    'Handling Ambiguous Requirements',
                    'Process Improvement',
                    'Overcoming Technical Challenges',
                    'Staying Updated with Technology',
                    'Pivoting Your Approach'
                ]
            },
            {
                title: 'Communication & Collaboration',
                children: [
                    'Explaining Technical Concepts to Non-Technical People',
                    'Disagreeing with Colleagues Professionally',
                    'Handling Feedback and Criticism',
                    'Working with Difficult People',
                    'Successful Collaboration Stories',
                    'Effective Remote Team Communication',
                    'Presenting to Senior Leadership',
                    'Asking for Help When Needed',
                    'Handling Miscommunication',
                    'Conducting Effective Code Reviews'
                ]
            },
            {
                title: 'Project Management & Delivery',
                children: [
                    'Delivering Under Tight Deadlines',
                    'Handling Changing Requirements',
                    'Estimating Project Timelines',
                    'Managing Missed Deadlines',
                    'Risk Management Strategies',
                    'Balancing Quality and Deadlines',
                    'Reducing Project Scope',
                    'Managing Competing Priorities',
                    'Tracking Project Progress',
                    'Exceeding Expectations'
                ]
            },
            {
                title: 'Growth & Learning',
                children: [
                    'Professional Growth Experiences',
                    'Learning from Mistakes',
                    'Receiving and Acting on Feedback',
                    'Career Goals and Development Plans',
                    'Developing New Skills',
                    'Mentoring Junior Developers',
                    'Taking Initiative',
                    'Handling Stress and Pressure',
                    'Finding Work Motivation',
                    'Work-Life Balance Strategies'
                ]
            },
            {
                title: 'Company & Culture Fit',
                children: [
                    'Why This Company Interests You',
                    'Company Knowledge and Research',
                    'Aligning with Company Values',
                    'Ideal Work Environment',
                    'Thriving Company Culture Types',
                    'Contributing to Team Culture',
                    'Next Role Expectations',
                    'Diversity and Inclusion Approach',
                    'Going Above and Beyond',
                    'Questions for the Interviewer'
                ]
            },
            {
                title: 'STAR Method & Framework',
                children: [
                    'STAR Method Overview',
                    'Situation: Setting the Context',
                    'Task: Defining Your Responsibility',
                    'Action: Describing What You Did',
                    'Result: Quantifying the Outcome',
                    'Behavioral Question Preparation Framework',
                    'Common Behavioral Interview Mistakes',
                    'How to Structure Your Answers',
                    'Preparing Multiple Examples per Category',
                    'Practice and Mock Interview Tips'
                ]
            }
        ]
    }
];

// API prompt template
const createPrompt = (topic, category, subcategory) => {
    if (category === 'Behavioral') {
        return `
Provide comprehensive guidance for the behavioral interview topic: "${topic}" under the category "${subcategory}".
Do not include any introductory sentence or conversational text before the main content. Start directly with the first heading.

Your response must include these sections in order:
1. **Topic Overview:** Brief explanation of what this behavioral topic covers and why it's important in interviews.
2. **Common Questions:** List 5-7 specific questions interviewers might ask related to this topic.
3. **STAR Method Application:** How to structure answers using Situation, Task, Action, Result framework.
4. **Answer Framework:** Step-by-step approach to crafting strong responses.
5. **Example Scenarios:** 2-3 concrete examples of situations that would work well for this topic.
6. **Do's and Don'ts:** Key guidelines for what to include and what to avoid.
7. **Sample Answer:** One complete sample answer using the STAR method.
8. **Follow-up Questions:** Potential follow-up questions interviewers might ask.
9. **Preparation Tips:** How to prepare and practice for this type of question.

Format the entire response using Markdown. Use clear headings and bullet points for readability.
`;
    } else if (category === 'System Design') {
        return `
Provide comprehensive system design guidance for: "${topic}" under the category "${subcategory}".
Do not include any introductory sentence or conversational text before the main content. Start directly with the first heading.

Your response must include these sections in order:
1. **Concept Overview:** Clear definition and importance in system design.
2. **Key Components:** Main elements and building blocks involved.
3. **Architecture Patterns:** Common patterns and approaches used.
4. **Implementation Details:** Technical implementation considerations.
5. **Trade-offs & Considerations:** Pros, cons, and when to use this approach.
6. **Real-world Examples:** How major companies implement this concept.
7. **Scalability Aspects:** How this scales and performs under load.
8. **Common Interview Questions:** Questions interviewers ask about this topic.
9. **Related Concepts:** Connected topics and concepts to explore further.

Format the entire response using Markdown. Use diagrams in text format where helpful.
`;
    } else {
        // Default for Algorithms
        return `
Explain the following algorithm topic in detail for a software engineering interview candidate whose primary programming language is Java.
Do not include any introductory sentence or conversational text before the main content. Start directly with the explanation's first heading.

The topic is: "${topic}" under the category "${subcategory}".

Your explanation must be comprehensive and include these sections in order:
1.  **Introduction/Definition:** Clear and concise.
2.  **Algorithm/Method:** Step-by-step explanation. Use analogies.
3.  **Java Implementation:** A complete, well-commented, runnable Java code example.
4.  **Complexity Analysis:** Detailed time and space complexity with justifications.
5.  **Applications & Use Cases:** Primary use cases and real-world applications.
6.  **Pros and Cons / Trade-offs:** Advantages and disadvantages.
7.  **Common Interview Questions:** A few common interview questions.
8.  **LeetCode Practice Problems:** Suggest 2-3 relevant LeetCode problems (with links) for practice, categorized by difficulty (Easy, Medium, Hard).

Format the entire response using Markdown. Use headings for each section and triple backticks with 'java' for code blocks.
`;
    }
};
