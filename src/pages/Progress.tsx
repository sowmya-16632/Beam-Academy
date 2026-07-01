export default function Progress() {
  const progress = [
    { name: "Java", value: 45 },
    { name: "SQL", value: 30 },
    { name: "DSA", value: 20 },
    { name: "Aptitude", value: 60 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">📊 Progress</h1>

      {progress.map((item) => (
        <div key={item.name} className="mb-6">
          <div className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>{item.value}%</span>
          </div>

          <div className="bg-slate-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}