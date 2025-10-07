// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ReportForm from "./pages/ReportForm";
import ReportList from "./pages/ReportList";

// Componente simples para proteger rotas
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Tela de login */}
        <Route path="/" element={<Login />} />

        {/* Home protegida */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Formulário de relatório protegido */}
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportForm />
            </ProtectedRoute>
          }
        />

        {/* Lista de relatórios protegida */}
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ReportList />
            </ProtectedRoute>
          }
        />

        {/* Redireciona qualquer rota desconhecida para o login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
