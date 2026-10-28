export interface AptitudeQuestion {
  id: string;
  category: "Quantitative" | "Logical Reasoning" | "Verbal";
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const aptitudeQuestionBank: AptitudeQuestion[] = [
  // Quantitative
  {
    id: "quant-1",
    category: "Quantitative",
    topic: "Percentages",
    question: "If A's salary is 25% more than B's salary, then by what percentage is B's salary less than A's salary?",
    options: ["20%", "25%", "16.66%", "33.33%"],
    correctAnswer: 0,
    explanation: "Let B's salary = 100. Then A's salary = 125. The difference is 25. Percentage less = (25 / 125) * 100 = 20%."
  },
  {
    id: "quant-2",
    category: "Quantitative",
    topic: "Profit and Loss",
    question: "A merchant buys an article for $240 and sells it for $300. What is the profit percentage?",
    options: ["20%", "25%", "30%", "15%"],
    correctAnswer: 1,
    explanation: "Profit = Selling Price - Cost Price = 300 - 240 = 60. Profit % = (60 / 240) * 100 = 25%."
  },
  {
    id: "quant-3",
    category: "Quantitative",
    topic: "Time and Work",
    question: "A can complete a task in 12 days, and B can complete it in 24 days. How many days will they take working together?",
    options: ["6 days", "8 days", "10 days", "9 days"],
    correctAnswer: 1,
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/24. Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8. Total days = 8 days."
  },
  {
    id: "quant-4",
    category: "Quantitative",
    topic: "Time Speed Distance",
    question: "A train 150 meters long passes an electric pole in 15 seconds. What is the speed of the train in km/h?",
    options: ["36 km/h", "45 km/h", "54 km/h", "25 km/h"],
    correctAnswer: 0,
    explanation: "Speed = Distance / Time = 150 / 15 = 10 m/s. Convert to km/h: 10 * (18 / 5) = 36 km/h."
  },
  {
    id: "quant-5",
    category: "Quantitative",
    topic: "Ratio and Proportion",
    question: "Two numbers are in the ratio 3:5. If 9 is subtracted from each, the ratio becomes 12:23. Find the smaller number.",
    options: ["27", "33", "45", "55"],
    correctAnswer: 1,
    explanation: "Let numbers be 3x and 5x. (3x - 9) / (5x - 9) = 12 / 23 => 23*(3x - 9) = 12*(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33."
  },
  {
    id: "quant-6",
    category: "Quantitative",
    topic: "Probability",
    question: "Two dice are rolled simultaneously. What is the probability of getting a sum equal to 7?",
    options: ["1/6", "1/12", "5/36", "7/36"],
    correctAnswer: 0,
    explanation: "Total outcomes = 36. Pairs giving sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Probability = 6 / 36 = 1/6."
  },

  // Logical Reasoning
  {
    id: "logical-1",
    category: "Logical Reasoning",
    topic: "Number Series",
    question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    explanation: "Differences between adjacent terms: +4, +6, +8, +10. Next difference is +12. 30 + 12 = 42. (Alternatively: n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42)."
  },
  {
    id: "logical-2",
    category: "Logical Reasoning",
    topic: "Coding-Decoding",
    question: "If in a code language 'SPRING' is written as 'UNUIPK', how is 'SPRING' shifted?",
    options: ["Each letter +2", "Odd +2, Even +3", "Alternating +2, +0", "Each letter +1"],
    correctAnswer: 0,
    explanation: "S(+2)=U, P(+2)=R, R(+2)=T, I(+2)=K, N(+2)=P, G(+2)=I. Every character is shifted forward by 2 positions."
  },
  {
    id: "logical-3",
    category: "Logical Reasoning",
    topic: "Blood Relations",
    question: "Pointing to a photograph, a woman says: 'He is the only son of my father's only daughter.' How is the person related to the woman?",
    options: ["Brother", "Son", "Nephew", "Father"],
    correctAnswer: 1,
    explanation: "'My father's only daughter' is the woman herself. Therefore, 'the only son of myself' is her son."
  },
  {
    id: "logical-4",
    category: "Logical Reasoning",
    topic: "Directions",
    question: "Ravi walks 10 km North, turns right and walks 6 km, then turns right again and walks 10 km. How far and in which direction is he from the starting point?",
    options: ["6 km East", "6 km West", "10 km South", "16 km East"],
    correctAnswer: 0,
    explanation: "North 10 km, then right (East) 6 km, then right (South) 10 km cancels out the vertical displacement. He is 6 km East of the origin."
  },

  // Verbal
  {
    id: "verbal-1",
    category: "Verbal",
    topic: "Sentence Correction",
    question: "Select the grammatically correct sentence:",
    options: [
      "Neither the manager nor the engineers was available.",
      "Neither the manager nor the engineers were available.",
      "Neither of the engineers were available.",
      "Either the engineer or the managers was present."
    ],
    correctAnswer: 1,
    explanation: "When subjects are joined by 'neither... nor', the verb agrees with the closer subject. 'Engineers' is plural, so 'were' is correct."
  },
  {
    id: "verbal-2",
    category: "Verbal",
    topic: "Vocabulary",
    question: "What is the synonym of 'UBIQUITOUS'?",
    options: ["Omnipresent", "Scarce", "Transient", "Obscure"],
    correctAnswer: 0,
    explanation: "'Ubiquitous' means present, appearing, or found everywhere; hence 'Omnipresent' is its exact synonym."
  },
  {
    id: "verbal-3",
    category: "Verbal",
    topic: "Grammar & Idioms",
    question: "Fill in the blank: The software team decided to call it a day after they _____ the bug.",
    options: ["had resolved", "have resolved", "resolve", "are resolving"],
    correctAnswer: 0,
    explanation: "Past perfect 'had resolved' is used for an action completed before another past event ('decided to call it a day')."
  }
];
