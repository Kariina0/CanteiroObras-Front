import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação básica
    if (user.trim() === "" || pin.trim() === "") {
      alert("⚠️ Preencha todos os campos para continuar!");
      return;
    }

    if (pin.length < 4) {
      alert("O PIN deve ter pelo menos 4 dígitos.");
      return;
    }

    // Simulação de login (salva localmente)
    localStorage.setItem("user", JSON.stringify({ user, pin }));

    // Redireciona
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ObraLink</h2>
      <p style={styles.subtitle}>
        Comunicação ágil entre canteiro e escritório
      </p>

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
          placeholder="PIN de acesso"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.background = "#2563eb")}
        >
          Entrar
        </button>
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
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#cbd5e1",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "260px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};
