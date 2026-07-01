import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  title: string;
  topics: string[];
}

export default function RoadmapCard({ title, topics }: Props) {
  const [completed, setCompleted] = useLocalStorage<boolean[]>(
    title,
    Array(topics.length).fill(false)
  );

  const toggle = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  const percent = Math.round(
    (completed.filter(Boolean).length / topics.length) * 100
  );

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      <p className="text-blue-400 mb-5">
        Progress: {percent}%
      </p>

      {topics.map((topic, index) => (
        <label
          key={index}
          className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg mb-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={completed[index]}
            onChange={() => toggle(index)}
          />

          <span
            className={
              completed[index]
                ? "line-through text-gray-500"
                : ""
            }
          >
            {topic}
          </span>
        </label>
      ))}
    </div>
  );
}