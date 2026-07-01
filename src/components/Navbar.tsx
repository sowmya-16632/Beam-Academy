import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center bg-slate-900 p-5 shadow">
      <h1 className="text-2xl font-bold">🚀 Beam Academy</h1>

      <div className="flex items-center gap-5">
        <FaBell size={22} />
        <FaUserCircle size={30} />
      </div>
    </header>
  );
}