import { getQueue, removeFromQueue } from '../db/idb';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // depois podemos ajustar para produção

export async function syncPending() {
  if (!navigator.onLine) return;
  const queue = await getQueue();
  for (const item of queue) {
    try {
      const formData = new FormData();
      formData.append('obra', item.obra);
      formData.append('descricao', item.descricao);
      formData.append('data', item.data);
      item.fotos.forEach(f => formData.append('fotos', f));

      await axios.post(`${API_URL}/reports`, formData);
      await removeFromQueue(item.id);
      console.log('Sincronizado:', item.id);
    } catch (err) {
      console.error('Erro ao sincronizar', err);
    }
  }
}

window.addEventListener('online', syncPending);
