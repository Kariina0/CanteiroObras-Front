import React, { useState } from "react";
import { addToQueue } from "../db/idb";
import { syncPending } from "../api/sync";
import { useNavigate } from "react-router-dom";
import "./ReportForm.css";

export default function ReportForm() {
  const [obra, setObra] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [fotos, setFotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFotos(Array.from(e.target.files));

  const salvarLocal = async () => {
    if (saving) return;
    if (!obra.trim() || !descricao.trim()) return alert("⚠️ Preencha todos os campos!");

    setSaving(true);
    const timestamp = Date.now();
    const fotosRenamed = fotos.map((f, i) => new File([f], `${obra}-${timestamp}-${i}.${f.name.split(".").pop()}`));

    const item = { obra, descricao, data, fotos: fotosRenamed };
    await addToQueue(item);
    try { await syncPending(); } catch { console.log("Sem conexão, ficará na fila."); }

    setSaving(false);
    alert("✅ Relatório salvo localmente! Será enviado quando houver internet.");
    navigate("/list", { state: { refresh: true } });
  };

  return (
    <div className="report-container">
      <h2>📋 Enviar Relatório Diário</h2>

      <label>Obra</label>
      <input type="text" placeholder="Nome ou código da obra" value={obra} onChange={(e) => setObra(e.target.value)} />

      <label>Data</label>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

      <label>Descrição das atividades</label>
      <textarea placeholder="Descreva as atividades..." value={descricao} onChange={(e) => setDescricao(e.target.value)} />

      <label>Fotos (use a câmera do celular)</label>
      <input type="file" multiple accept="image/*" capture="environment" onChange={handleFileChange} />
      <p>{fotos.length} foto(s) selecionada(s)</p>

      <button onClick={salvarLocal} disabled={saving}>{saving ? "Salvando..." : "💾 Salvar / Enviar"}</button>
    </div>
  );
}
