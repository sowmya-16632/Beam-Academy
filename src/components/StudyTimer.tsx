import { useEffect, useState } from "react";

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const hrs = Math.floor(minutes / 60);

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        ⏱ Study Timer
      </h2>

      <h1 className="text-5xl text-blue-400">
        {hrs}h {minutes % 60}m {seconds % 60}s
      </h1>
    </div>
  );
}