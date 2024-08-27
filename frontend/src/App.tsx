import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SharedLinkPage from "./components/SharedLinkPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:shortLink" element={<SharedLinkPage />} />
      </Routes>
    </Router>
  );
};

export default App;
