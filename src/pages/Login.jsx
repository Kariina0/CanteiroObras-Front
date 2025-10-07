import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user.trim() || !pin.trim()) return alert("⚠️ Preencha todos os campos!");
    if (!/^\d{4,}$/.test(pin)) return alert("PIN deve conter apenas números e ter ≥4 dígitos.");

    localStorage.setItem("user", JSON.stringify({ user, pin }));
    navigate("/home");
  };

  return (
    <div className="login-container">
      <h2>ObraLink</h2>
      <p>Comunicação ágil entre canteiro e escritório</p>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Nome de usuário" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="password" placeholder="PIN de acesso" value={pin} onChange={(e) => setPin(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
