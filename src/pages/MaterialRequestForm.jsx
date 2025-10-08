import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MaterialRequestForm() {
  const [obra, setObra] = useState("");
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [dataDesejada, setDataDesejada] = useState(new Date().toISOString().slice(0, 10));
  const [observacoes, setObservacoes] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/materials";

  const handleSubmit = async () => {
    if (!obra || !material || !quantidade || !dataDesejada) {
      alert("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      await axios.post(API_URL, { obra, material, quantidade, dataDesejada, observacoes });
      alert("✅ Solicitação enviada com sucesso!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ Falha ao enviar solicitação.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Solicitar Material</h2>

      <label style={styles.label}>Obra</label>
      <input type="text" value={obra} onChange={e => setObra(e.target.value)} style={styles.input} />

      <label style={styles.label}>Material</label>
      <input type="text" value={material} onChange={e => setMaterial(e.target.value)} style={styles.input} />

      <label style={styles.label}>Quantidade</label>
      <input type="number" min={1} value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} style={styles.input} />

      <label style={styles.label}>Data desejada</label>
      <input type="date" value={dataDesejada} onChange={e => setDataDesejada(e.target.value)} style={styles.input} />

      <label style={styles.label}>Observações</label>
      <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} style={styles.textarea} />

      <button onClick={handleSubmit} style={styles.button}>Enviar Solicitação</button>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 600, margin: "0 auto" },
  title: { textAlign: "center", marginBottom: 20 },
  label: { display: "block", marginTop: 10, fontWeight: "bold" },
  input: { width: "100%", padding: 10, borderRadius: 6, border: "1px solid #cbd5e1", marginBottom: 10 },
  textarea: { width: "100%", padding: 10, borderRadius: 6, border: "1px solid #cbd5e1", marginBottom: 10, height: 80 },
  button: { width: "100%", padding: 12, background: "#2563eb", color: "white", border: "none", borderRadius: 8, cursor: "pointer", marginTop: 10 }
};
