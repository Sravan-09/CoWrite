# <img src="client/public/logo512.png" width="50" height="50" valign="middle"> CoWrite

CoWrite is a real-time collaborative rich-text editor built for seamless multi-user document editing. Powered by WebSockets for instant synchronization and backed by persistent storage, it ensures low-latency collaboration, consistent state management, and reliable data durability.

## 🚀 Features

### Real-time Collaboration
Multi-user editing with instant updates across all connected clients using **Socket.io**.

### Auto-Save
Automatic persistence to **MongoDB** every 2 seconds to prevent data loss.

### Dynamic Document Routing
Unique document generation using **UUIDs**, enabling private or shared editing sessions.

### Rich Text Formatting
Full suite of formatting tools powered by **Quill.js**, including:
- Headers
- Font sizes
- Ordered and unordered lists
- Image support

### Standard Typography

Supports professional font sizing:

**Small**
- 8pt  
- 9pt  
- 10pt  

**Standard**
- 11pt  
- 12pt  
- 14pt  

**Large / Headings**
- 18pt  
- 24pt  
- 30pt  
- 36pt  
- 48pt  
- 60pt  
- 72pt  
- 96pt  

### Print Optimized
Custom CSS ensures documents render cleanly when printed or exported to PDF.

### Loading States
Visual feedback while fetching document data from the database.

## 🛠️ Tech Stack

### Frontend
- **React.js** — Functional components and Hooks (`useEffect`, `useCallback`, `useState`)
- **Quill.js** — Rich-text editor engine
- **Socket.io-client** — Real-time communication
- **React Router** — Dynamic routing for document-specific URLs

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Server framework
- **Socket.io** — Real-time, bidirectional WebSocket communication
- **MongoDB** — NoSQL database
- **Mongoose** — ODM for schema modeling and database operations

## 📂 Project Structure

```
COWRITE/
├── client/                # React Frontend Application
│   ├── public/            # Static assets
│   │   ├── index.html     # Main HTML template
│   │   ├── logo512.png    # App Icon
│   │   └── manifest.json  # PWA configuration
│   ├── src/               # Application Source Code
│   │   ├── App.js         # Routing and Main Logic
│   │   ├── index.js       # React Entry Point
│   │   ├── styles.css     # Global CSS and Editor Styles
│   │   └── TextEditor.js  # Quill & Socket Implementation
│   ├── .gitignore         # Client-specific ignore rules
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Project documentation
├── server/                # Node.js Backend Application
│   ├── Document.js        # Mongoose Schema (MongoDB Model)
│   ├── server.js          # Socket.io Logic & DB Connection
│   ├── .gitignore         # Server-specific ignore rules
│   └── package.json       # Backend dependencies
└── LICENSE.gnumeric       # License information
```

## 📡 Socket Events

| Event Name         | Description |
|--------------------|------------|
| `get-document`     | Client requests document data using `documentId` |
| `load-document`    | Server sends initial document content to client |
| `send-changes`     | Client broadcasts user edits (Quill Deltas) |
| `receive-changes`  | Server syncs edits to all other users in the same room |
| `save-document`    | Client periodically sends full document state for database persistence |

## 📦 Installation & Setup

### 1️⃣ Setup the Server

```bash
cd server
npm install
npm start
```

### 2️⃣ Setup the Client

```bash
cd client
npm install
npm start
```

## 📄 License

This project is classified as open-source software and is disseminated under the stipulations of the MIT License.


Developed by Sravan-09
