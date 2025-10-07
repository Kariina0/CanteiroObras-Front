Perfeito! Aqui está um **README.md unificado** para o projeto ObraLink, com instruções completas para rodar tanto o backend quanto o frontend:

```markdown
# ObraLink 🚧

**Comunicação ágil entre canteiro de obras e escritório**  
Sistema para envio de relatórios diários, medições, fotos e solicitações de compra. Funciona offline, salvando dados localmente e sincronizando quando houver internet.

---

## 🛠 Tecnologias

- **Frontend:** React, React Router, Axios, IndexedDB (idb)  
- **Backend:** Node.js, Express, MongoDB (Mongoose), Multer  
- **Outros:** dotenv, nodemon, CORS  

---

## 📁 Estrutura do projeto

```

obra-link/
├─ backend/
│  ├─ config/db.js
│  ├─ models/Report.js
│  ├─ routes/reportRoutes.js
│  ├─ .env
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ api/sync.js
│  │  ├─ db/idb.js
│  │  ├─ pages/Home.jsx
│  │  ├─ pages/Login.jsx
│  │  ├─ pages/ReportForm.jsx
│  │  ├─ pages/ReportList.jsx
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  └─ package.json
└─ README.md

````

---

## 💻 Pré-requisitos

Antes de rodar o projeto, instale:

1. **Node.js e npm**  
   ```bash
   node -v
   npm -v
````

Se não tiver, baixe em [Node.js](https://nodejs.org/).

2. **MongoDB**

   * Pode ser local ou Atlas (nuvem).
   * Verifique que o banco está acessível e configure a URI no backend `.env`.

---

## ⚡ Backend

### 1️⃣ Instalação

```bash
cd backend
npm install
```

Crie um arquivo `.env` com a seguinte estrutura:

```
PORT=4000
MONGO_URI=mongodb+srv://<seu_usuario>:<sua_senha>@<cluster>.mongodb.net/obralink
```

### 2️⃣ Rodar o servidor

* Desenvolvimento com nodemon:

```bash
npm run dev
```

* Produção:

```bash
npm start
```

O backend estará disponível em `http://localhost:4000`.

---

## ⚡ Frontend

### 1️⃣ Instalação

```bash
cd frontend
npm install
```

### 2️⃣ Rodar o frontend

```bash
npm run dev
```

Abra o navegador em [http://localhost:5173](http://localhost:5173) (Vite normalmente usa essa porta).

### 3️⃣ Configuração da API

Se o backend estiver em outro endereço, altere a URL no arquivo `src/api/sync.js`:

```javascript
const API_URL = 'http://localhost:4000/api';
```

---

## 🔹 Funcionalidades

* **Login simples**: usuário e PIN salvos localmente.
* **Envio de relatórios**: formulário com obra, descrição, data e fotos.
* **Armazenamento offline**: dados salvos no IndexedDB e enviados quando houver internet.
* **Visualização de relatórios**: lista com todos os relatórios enviados, incluindo fotos.

---

## ⚙️ Observações

* O backend permite até 5 fotos por relatório (configuração do Multer).
* Autenticação é local, sem segurança para produção.
* Ideal usar em dispositivos móveis para aproveitar a câmera.

---
