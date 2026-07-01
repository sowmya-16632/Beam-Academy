import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Java from "./pages/Java";
import SQL from "./pages/SQL";
import DSA from "./pages/DSA";
import Progress from "./pages/Progress";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/java" element={<Java />} />
        <Route path="/sql" element={<SQL />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;