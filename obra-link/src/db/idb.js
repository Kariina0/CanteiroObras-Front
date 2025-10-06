import { openDB } from "idb";

export async function initDB() {
  return openDB("obraLinkDB", 1, {
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

export async function addToQueue(item) {
  const db = await initDB();
  await db.add("queue", item);
}

export async function getQueue() {
  const db = await initDB();
  return db.getAll("queue");
}

export async function removeFromQueue(id) {
  const db = await initDB();
  await db.delete("queue", id);
}
