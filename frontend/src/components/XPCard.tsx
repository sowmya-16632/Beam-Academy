interface XPCardProps {
  xp: number;
}

export default function XPCard({ xp }: XPCardProps) {
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white">
        🏆 Your Level
      </h2>

      <p className="text-5xl font-bold mt-4 text-white">
        Level {level}
      </p>

      <p className="mt-2 text-white">
        {xp} XP
      </p>

      <div className="bg-white/20 h-3 rounded-full mt-5">
        <div
          className="bg-yellow-400 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-white">
        {100 - progress} XP to next level
      </p>
    </div>
  );
}