interface ProgressCardProps {
  title: string;
  progress: number;
}

export default function ProgressCard({
  title,
  progress,
}: ProgressCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="text-4xl text-blue-400 mt-4">
        {progress}%
      </p>

      <div className="w-full h-3 bg-slate-700 rounded-full mt-5">
        <div
          className="h-3 bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}