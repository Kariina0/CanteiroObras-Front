// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ReportForm from "./pages/ReportForm";
import ReportList from "./pages/ReportList";
import MaterialRequestForm from "./pages/MaterialRequestForm";

// Componente para proteger rotas
function ProtectedRoute({ children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  // Rotas protegidas
  const protectedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/report", element: <ReportForm /> },
    { path: "/list", element: <ReportList /> },
    { path: "/material", element: <MaterialRequestForm /> }, // nova rota
  ];

  return (
    <Router>
      <Routes>
        {/* Tela de login */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        {protectedRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={<ProtectedRoute>{r.element}</ProtectedRoute>}
          />
        ))}

        {/* Qualquer rota desconhecida volta para login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
