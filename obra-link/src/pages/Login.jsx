import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validação simples
    if (user.trim() === "" || pin.trim() === "") {
      alert("Preencha todos os campos");
      return;
    }
    // Salva login local (simulação)
    localStorage.setItem("user", JSON.stringify({ user, pin }));
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <h2>ObraLink</h2>
      <p>Comunicação ágil entre canteiro e escritório</p>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Entrar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
  },
  input: { padding: "10px", borderRadius: "6px", border: "none" },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
  },
};
