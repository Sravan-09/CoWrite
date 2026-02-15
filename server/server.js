const mongoose = require("mongoose")
const Document = require("./Document")

/* Database Connection: 
   Connects to the local MongoDB instance using the 'coWriteDB' database.
*/
mongoose.connect("mongodb://127.0.0.1:27017/coWriteDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
})

/* Socket.io Initialization: 
   Runs on port 3001 with CORS configured to allow the React frontend on port 3000.
*/
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

console.log("Socket server running on port 3001")

const defaultValue = "" // Initial state for brand new documents

io.on("connection", socket => {
  /* Document Session Management */
  socket.on("get-document", async documentId => {
    // 1. Retrieve existing document or create a new entry in DB
    const document = await findOrCreateDocument(documentId)
    
    // 2. Isolate users: Join a 'room' based on the document ID 
    // so changes don't leak to other documents.
    socket.join(documentId)
    
    // 3. Send the current document state back to the requesting user
    socket.emit("load-document", document.data)

    /* Real-time Change Broadcasting: 
       When one user edits, broadcast the 'delta' only to others in the same room.
    */
    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    /* Data Persistence: Saves the current state to MongoDB */
    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

/**
 * findOrCreateDocument
 * Checks for document existence; if not found, initializes a new record.
 */
async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  
  // Creates a new document using the ID provided by the frontend routing
  return await Document.create({ _id: id, data: defaultValue })
}