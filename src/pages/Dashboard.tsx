import Layout from "../components/Layout";
import ProgressCard from "../components/ProgressCard";
import StudyTimer from "../components/StudyTimer";
import StreakCard from "../components/StreakCard";
import DailyGoals from "../components/DailyGoals";

export default function Dashboard() {
  const cards = [
    { title: "Java", progress: 45 },
    { title: "SQL", progress: 30 },
    { title: "DSA", progress: 20 },
    { title: "Aptitude", progress: 60 },
  ];

  return (
    <Layout>
      <h1 className="text-4xl font-bold">
        Good Evening, Sowmya 👋
      </h1>

      <p className="text-gray-400 mt-2">
        Welcome back to Beam Academy
      </p>

      {/* Today's Mission */}
      <div className="mt-8 bg-slate-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          🎯 Today's Mission
        </h2>

        <ul className="space-y-3">
          <li>✅ Java - 2 Hours</li>
          <li>⏳ SQL - 1 Hour</li>
          <li>⏳ DSA - 1 Hour</li>
          <li>⏳ Aptitude - 30 Minutes</li>
        </ul>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {cards.map((card) => (
          <ProgressCard
            key={card.title}
            title={card.title}
            progress={card.progress}
          />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
  <StreakCard />
  <DailyGoals />
</div>

      {/* Study Timer */}
      <StudyTimer />
    </Layout>
  );
}