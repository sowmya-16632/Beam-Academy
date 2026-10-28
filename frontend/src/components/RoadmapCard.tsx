import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  title: string;
  topics: string[];
}

export default function RoadmapCard({ title, topics }: Props) {
  const [completed, setCompleted] = useLocalStorage<boolean[]>(
    `course-${title}`,
    Array(topics.length).fill(false)
  );

  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const toggle = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  const percent =
    topics.length === 0
      ? 0
      : Math.round(
          (completed.filter(Boolean).length / topics.length) * 100
        );

  return (
    <div className="bg-slate-900 rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          <p className="text-blue-400 mt-2">
            {completed.filter(Boolean).length} / {topics.length} completed
          </p>
        </div>

        <div className="text-3xl font-bold text-green-400">
          {percent}%
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-slate-700 rounded-full h-3 mb-8">

        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />

      </div>

      {/* TOPICS */}
      <div className="space-y-3">

        {topics.map((topic, index) => (

          <div
            key={topic}
            className={`rounded-xl p-4 transition ${
              completed[index]
                ? "bg-green-950 border border-green-700"
                : "bg-slate-800"
            }`}
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() => toggle(index)}
                  className="w-5 h-5"
                />

                <span
                  className={`text-lg ${
                    completed[index]
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {topic}
                </span>

              </div>

              <button
                onClick={() =>
                  setSelectedTopic(
                    selectedTopic === index ? null : index
                  )
                }
                className="text-blue-400 hover:text-blue-300"
              >
                {selectedTopic === index
                  ? "Hide"
                  : "Learn →"}
              </button>

            </div>

            {/* LEARNING PANEL */}
            {selectedTopic === index && (

              <div className="mt-5 pt-5 border-t border-slate-700">

                <h3 className="text-xl font-bold text-blue-400">
                  📚 {topic}
                </h3>

                <p className="text-gray-300 mt-3">
                  Study the core concepts of <b>{topic}</b>,
                  understand the syntax, solve examples and
                  prepare for interview questions.
                </p>

                <div className="mt-5">

                  <h4 className="text-lg font-semibold text-white">
                    🎯 Interview Focus
                  </h4>

                  <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">

                    <li>
                      Understand the fundamental concepts.
                    </li>

                    <li>
                      Write at least 2 practical examples.
                    </li>

                    <li>
                      Solve placement-level problems.
                    </li>

                    <li>
                      Be able to explain the concept in an interview.
                    </li>

                  </ul>

                </div>

                <button
                  onClick={() => toggle(index)}
                  className={`mt-6 px-5 py-3 rounded-lg font-semibold ${
                    completed[index]
                      ? "bg-slate-700 text-gray-300"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {completed[index]
                    ? "✓ Completed"
                    : "Mark as Completed"}
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}