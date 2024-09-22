import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SharedLinkPage from "./components/SharedLinkPage";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
  console.log("googleClientId:" + googleClientId);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:shortLink" element={<SharedLinkPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
