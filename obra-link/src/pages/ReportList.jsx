// src/pages/ReportList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReportList() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000/api/reports";

  useEffect(() => {
    fetchRelatorios();
  }, []);

  const fetchRelatorios = async () => {
    try {
      const res = await axios.get(API_URL);
      setRelatorios(res.data);
    } catch (err) {
      console.error("Erro ao buscar relatórios:", err);
      setErro("Não foi possível carregar os relatórios.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={styles.loading}>⏳ Carregando relatórios...</p>;
  }

  if (erro) {
    return <p style={styles.error}>❌ {erro}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📄 Relatórios Cadastrados</h2>

      {relatorios.length === 0 ? (
        <p style={styles.empty}>Nenhum relatório encontrado.</p>
      ) : (
        relatorios.map((r) => (
          <div key={r._id} style={styles.reportCard}>
            <p>
              <strong>🏗️ Obra:</strong> {r.obra}
            </p>
            <p>
              <strong>📅 Data:</strong> {r.data}
            </p>
            <p>
              <strong>📝 Descrição:</strong> {r.descricao}
            </p>
            <p>
              <strong>📌 Status:</strong> {r.status}
            </p>

            {r.fotos && r.fotos.length > 0 && (
              <div style={styles.photos}>
                {r.fotos.map((foto, idx) => (
                  <img
                    key={idx}
                    src={`${
                      import.meta.env.VITE_API_URL?.replace(
                        "/api/reports",
                        ""
                      ) || "http://localhost:4000"
                    }/${foto}`}
                    alt={`Foto ${idx + 1}`}
                    style={styles.photo}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#1e293b",
    marginBottom: "20px",
  },
  reportCard: {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  photos: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  photo: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    color: "#334155",
  },
  error: {
    textAlign: "center",
    color: "#dc2626",
    marginTop: "50px",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "40px",
  },
};
