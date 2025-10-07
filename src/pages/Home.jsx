import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-container">
      <h2>Bem-vindo, {user?.user || "Usuário"}</h2>
      <p>Escolha uma ação:</p>
      <div className="home-menu">
        <button onClick={() => navigate("/report")}>Enviar Relatório Diário</button>
        <button onClick={() => alert("Função em desenvolvimento")}>Solicitar Material</button>
      </div>
      <button className="logout" onClick={logout}>Sair</button>
    </div>
  );
}
