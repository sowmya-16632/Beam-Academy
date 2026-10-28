import { useState } from "react";

export default function DailyGoals() {
  const [goals, setGoals] = useState([
    { text: "Java Collections", done: true },
    { text: "SQL Joins", done: false },
    { text: "DSA Binary Search", done: false },
    { text: "Aptitude Practice", done: false },
  ]);

  const toggleGoal = (index: number) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        🎯 Daily Goals
      </h2>

      {goals.map((goal, index) => (
        <div
          key={index}
          className="flex items-center gap-3 py-2"
        >
          <input
            type="checkbox"
            checked={goal.done}
            onChange={() => toggleGoal(index)}
          />

          <span
            className={goal.done ? "line-through text-gray-500" : ""}
          >
            {goal.text}
          </span>
        </div>
      ))}
    </div>
  );
}