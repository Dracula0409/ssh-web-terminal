# 🔐 Web SSH Terminal

A full-stack web application that allows users to connect to remote servers via SSH from the browser. Built using **React** for the frontend and **Node.js (Express + Socket.IO)** on the backend with **ssh2** for managing SSH sessions.

---

## 🚀 Features

- Connect to any SSH server with host, port, username, and password
- Interactive SSH terminal in the browser using xterm.js
- Real-time communication via WebSockets (Socket.IO)
- Automatically resizes terminal on window resize
- Gracefully ends session and cleans up

---

## 🧱 Tech Stack

**Frontend**

- React
- xterm.js
- Socket.IO Client
- CSS (theme-based)

**Backend**

- Node.js
- Express
- ssh2
- Socket.IO
- dotenv

---

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- npm

---

## 🔌 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd ssh-back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add this to `package.json` if using ESModules:

   ```json
   {
     "type": "module"
   }
   ```

4. Start the server:

   ```bash
   node index.js
   ```

---

## 💻 Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ssh front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm run dev
   ```

---

## 🌐 Usage

- Go to `http://localhost:5173`
- Enter your SSH credentials
- Click "Start Session"
- You’ll be connected to your server in a browser terminal

---

## 🧑‍💻 Author

**Jeffin Asir**  
Chennai, India  
Passionate about backend systems & terminal tools.

---

## 📄 License

MIT License
