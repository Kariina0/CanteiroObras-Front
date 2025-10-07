// src/api/sync.js
import { getQueue, removeFromQueue } from "../db/idb";
import axios from "axios";

const API_URL = "http://localhost:4000/api"; // depois ajustar para produção

/**
 * Sincroniza os relatórios pendentes do IndexedDB com o backend
 */
export async function syncPending() {
  // Se estiver offline, não faz nada
  if (!navigator.onLine) return;

  const queue = await getQueue();
  for (const item of queue) {
    try {
      const formData = new FormData();
      formData.append("obra", item.obra);
      formData.append("descricao", item.descricao);
      formData.append("data", item.data);

      // Se fotos são arquivos (File/Blob), adiciona cada uma
      if (item.fotos && item.fotos.length > 0) {
        item.fotos.forEach((f) => {
          // Se for um caminho (string), precisa converter em Blob
          if (typeof f === "string") {
            fetch(f)
              .then((res) => res.blob())
              .then((blob) => {
                formData.append("fotos", blob, f.split("/").pop());
              });
          } else {
            // Se já for File/Blob
            formData.append("fotos", f);
          }
        });
      }

      // Envia para o backend
      await axios.post(`${API_URL}/reports`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Remove do IndexedDB após envio
      await removeFromQueue(item.id);
      console.log(`✅ Relatório ${item.id} sincronizado!`);
    } catch (err) {
      console.error(`❌ Falha ao sincronizar relatório ${item.id}:`, err);
    }
  }
}

// Event listener que dispara quando a conexão volta
window.addEventListener("online", syncPending);
