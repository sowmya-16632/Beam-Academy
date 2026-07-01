import { Link } from "react-router-dom";
import {
  FaHome,
  FaJava,
  FaDatabase,
  FaCode,
  FaChartBar,
  FaFileAlt,
  FaUserTie
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 h-screen p-6">

      <h1 className="text-3xl font-bold text-blue-500 mb-10">
        🚀 Beam
      </h1>

      <nav className="space-y-5">

        <Link to="/dashboard"><FaHome className="inline mr-3"/>Dashboard</Link><br/>

        <Link to="/java"><FaJava className="inline mr-3"/>Java</Link><br/>

        <Link to="/sql"><FaDatabase className="inline mr-3"/>SQL</Link><br/>

        <Link to="/dsa"><FaCode className="inline mr-3"/>DSA</Link><br/>

        <Link to="/progress"><FaChartBar className="inline mr-3"/>Progress</Link><br/>

        <Link to="/resume"><FaFileAlt className="inline mr-3"/>Resume</Link><br/>

        <Link to="/interview"><FaUserTie className="inline mr-3"/>Interview</Link>

      </nav>

    </aside>
  );
}