import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import DashboardPage from "./pages/dashboard-page";
import HelpPage from "./pages/help-page";
import NoMatchPage from "./pages/notfound-page";
import EditorPage from "./pages/editor-page";
import { RequireAuth } from "./hooks/require-auth"
import TemplatePage from "./pages/template-page";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/editor/:id" element={<RequireAuth><EditorPage /></RequireAuth>} />
        <Route path="/template" element={<TemplatePage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </>
  );
}

export default App;

