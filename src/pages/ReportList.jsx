import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ReportList.css";

export default function ReportList() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/reports";

  useEffect(() => {
    fetchRelatorios();
  }, [location.state?.refresh]);

  const fetchRelatorios = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setRelatorios(res.data);
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar relatórios:", err);
      setErro("Não foi possível carregar os relatórios.");
    } finally { setLoading(false); }
  };

  if (loading) return <p className="loading">⏳ Carregando relatórios...</p>;
  if (erro) return <p className="error">❌ {erro}</p>;

  return (
    <div className="list-container">
      <h2>📄 Relatórios Cadastrados</h2>
      {relatorios.length === 0 ? <p className="empty">Nenhum relatório encontrado.</p> :
        relatorios.map((r) => (
          <div key={r._id} className="report-card">
            <p><strong>🏗️ Obra:</strong> {r.obra}</p>
            <p><strong>📅 Data:</strong> {r.data}</p>
            <p><strong>📝 Descrição:</strong> {r.descricao}</p>
            <p><strong>📌 Status:</strong> {r.status}</p>
            {r.fotos && r.fotos.length > 0 && (
              <div className="photos">
                {r.fotos.map((foto, idx) => (
                  <img key={idx} src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/${foto.replace(/\\/g,"/")}`} alt={`Foto ${idx+1}`} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        ))
      }
    </div>
  );
}
