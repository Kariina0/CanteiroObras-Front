import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ReportForm from "./pages/ReportForm";
import ReportList from "./pages/ReportList";

// ProtectedRoute com try/catch
function ProtectedRoute({ children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const protectedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/report", element: <ReportForm /> },
    { path: "/list", element: <ReportList /> },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {protectedRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={<ProtectedRoute>{r.element}</ProtectedRoute>} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
