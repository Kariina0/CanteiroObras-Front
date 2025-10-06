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

  const handleFileChange = (e) => {
    setFotos(Array.from(e.target.files));
  };

  const salvarLocal = async () => {
    if (!obra || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    const item = { obra, descricao, data, fotos };
    await addToQueue(item);
    alert("Relatório salvo localmente! Será enviado quando houver internet.");
    syncPending().catch(() => {});
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <h2>Enviar Relatório Diário</h2>
      <input
        type="text"
        placeholder="Nome da Obra"
        value={obra}
        onChange={(e) => setObra(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Descreva as atividades executadas hoje..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        style={styles.textarea}
      />

      <label style={{ fontWeight: "bold" }}>Fotos (use a câmera)</label>
      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <p>{fotos.length} foto(s) selecionada(s)</p>

      <button onClick={salvarLocal} style={styles.button}>
        Salvar / Enviar
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "20px", background: "#f8fafc", minHeight: "100vh" },
  input: {
    display: "block",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
  },
  textarea: {
    display: "block",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    height: "100px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
  },
};
