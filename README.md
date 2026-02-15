<img src="client/public/logo512.png" width="40" height="40" valign="middle"> CoWrite

CoWrite is a real-time, collaborative rich-text editor inspired by Google Docs. It allows multiple users to edit the same document simultaneously with instant synchronization, powered by WebSockets and persistent storage.

🚀 Features

Real-time Collaboration: Multi-user editing with instant updates across all clients using Socket.io.

Auto-Save: Automatic persistence to MongoDB every 2 seconds to ensure no data loss.

Dynamic Document Routing: Unique document generation using UUIDs, allowing for private or shared editing sessions.

Rich Text Formatting: Full suite of tools including headers, font sizes, lists, and image support via Quill.js.

Print Optimized: Custom CSS styles to ensure documents look perfect when printed or exported to PDF.

Loading States: Visual feedback while fetching document data from the database.

🛠️ Tech Stack

Frontend:

React.js: Functional components and Hooks (useEffect, useCallback, useState).

Quill.js: The core rich-text editor engine.

Socket.io-client: Real-time signaling for broadcasting changes.

React Router: Dynamic routing for document-specific URLs.

Backend:

Node.js & Express: JavaScript runtime and server framework.

Socket.io: WebSocket implementation for real-time, bi-directional communication.

MongoDB: NoSQL database for flexible document storage.

Mongoose: ODM for modeling the document schema and handling DB operations.

📂 Project Structure & Key Files

The project is divided into a client-side React application and a server-side Node.js application:

COWRITE/
├── client/                # React Frontend Application
│   ├── node_modules/      # (Local only) Frontend dependencies
│   ├── public/            # Static assets
│   │   ├── index.html     # Main HTML template
│   │   ├── logo512.png    # App Icon (Custom Logo)
│   │   └── manifest.json  # PWA configuration
│   └── src/               # Application Source Code
│       ├── App.js         # Routing and Main Logic
│       ├── index.js       # React Entry Point
│       ├── styles.css     # Global CSS and Editor Styles
│       └── TextEditor.js  # Quill & Socket Implementation
│   ├── .gitignore         # Client-specific ignore rules
│   ├── package-lock.json  # Dependency lock file
│   ├── package.json       # Frontend dependencies and scripts
│   └── README.md          # Project documentation
├── server/                # Node.js Backend Application
│   ├── node_modules/      # (Local only) Backend dependencies
│   ├── .gitignore         # Server-specific ignore rules
│   ├── Document.js        # Mongoose Schema (MongoDB Model)
│   ├── package-lock.json  # Dependency lock file
│   ├── package.json       # Backend dependencies and scripts
│   └── server.js          # Socket.io Logic & DB Connection
└── LICENSE.gnumeric       # License information


📡 Socket Events

The application uses the following events to synchronize state:

get-document: Requests document data from the server.

load-document: Sent by the server with the initial document content.

send-changes: Sent by the client when the user makes an edit.

receive-changes: Broadcasted by the server to all users in a specific room.

save-document: Sent by the client periodically to persist data.

📦 Installation & Setup

Ensure you have Node.js and MongoDB installed and running locally.

1. Clone the repository

git clone [https://github.com/your-username/cowrite.git](https://github.com/your-username/cowrite.git)
cd cowrite


2. Setup the Server

cd server
npm install
# Ensure MongoDB is running on mongodb://127.0.0.1:27017
npm start


The server starts on http://localhost:3001.

3. Setup the Client

cd ../client
npm install
npm start


The client starts on http://localhost:3000.

⚠️ Pre-Upload Checklist (for GitHub)

If you are uploading via the GitHub website (drag-and-drop), please follow these steps to ensure a clean upload:

Delete node_modules: Delete the node_modules folder inside both the client and server directories. These folders are too large and should be ignored.

Include Package Files: Ensure package.json and package-lock.json are included so others can run npm install.

Verify Gitignore: Ensure your .gitignore files are in place to prevent future accidental uploads of dependencies or secrets.

📄 License

This project is open-source and available under the MIT License.