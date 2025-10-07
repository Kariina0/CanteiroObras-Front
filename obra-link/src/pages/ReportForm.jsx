// src/pages/ReportForm.jsx
import React, { useState } from "react";
import { addToQueue } from "../db/idb";
import { syncPending } from "../api/sync";
import { useNavigate } from "react-router-dom";

export default function ReportForm() {
  const [obra, setObra] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [fotos, setFotos] = useState([]);
  const navigate = useNavigate();

  // Captura arquivos selecionados
  const handleFileChange = (e) => {
    const arquivos = Array.from(e.target.files);
    setFotos(arquivos);
  };

  // Salva localmente e tenta sincronizar
  const salvarLocal = async () => {
    if (!obra.trim() || !descricao.trim()) {
      alert("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }

    const item = { obra, descricao, data, fotos };
    await addToQueue(item);

    alert(
      "✅ Relatório salvo localmente! Será enviado quando houver internet."
    );

    // Tenta sincronizar imediatamente
    try {
      await syncPending();
    } catch (err) {
      console.log("Sem conexão, ficará na fila.");
    }

    navigate("/list"); // Redireciona para lista de relatórios
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Enviar Relatório Diário</h2>

      <label style={styles.label}>Obra</label>
      <input
        type="text"
        placeholder="Nome ou código da obra"
        value={obra}
        onChange={(e) => setObra(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Data</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Descrição das atividades</label>
      <textarea
        placeholder="Descreva as atividades executadas hoje..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        style={styles.textarea}
      />

      <label style={styles.label}>Fotos (use a câmera do celular)</label>
      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={styles.input}
      />
      <p style={styles.info}>
        {fotos.length > 0
          ? `${fotos.length} foto(s) selecionada(s)`
          : "Nenhuma foto selecionada"}
      </p>

      <button onClick={salvarLocal} style={styles.button}>
        💾 Salvar / Enviar
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
    color: "#334155",
  },
  input: {
    display: "block",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },
  textarea: {
    display: "block",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    height: "120px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },
  info: {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "10px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};
