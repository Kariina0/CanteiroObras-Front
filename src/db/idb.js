import { openDB } from "idb"; // ESModule correto para Vite/React

let dbPromise;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB("obraLinkDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("queue")) {
          db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "username" });
        }
      },
    });
  }
  return dbPromise;
}

export async function addToQueue(item) {
  const db = await getDB();
  await db.add("queue", item);
}

export async function getQueue() {
  const db = await getDB();
  return db.getAll("queue");
}

export async function removeFromQueue(id) {
  const db = await getDB();
  await db.delete("queue", id);
}
