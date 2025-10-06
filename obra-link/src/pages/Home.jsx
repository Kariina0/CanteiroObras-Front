import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Bem-vindo, {user?.user || "Usuário"}</h2>
      <p>Escolha uma ação:</p>

      <div style={styles.menu}>
        <button onClick={() => navigate("/report")} style={styles.button}>
          Enviar Relatório Diário
        </button>
        <button
          onClick={() => alert("Função em desenvolvimento")}
          style={styles.button}
        >
          Solicitar Material
        </button>
      </div>

      <button onClick={logout} style={styles.logout}>
        Sair
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    background: "#f1f5f9",
    height: "100vh",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  logout: {
    marginTop: "40px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
  },
};
