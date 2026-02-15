import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

/** * Configuration Constants
 * SAVE_INTERVAL_MS: Frequency of auto-save to the database.
 * FONT_SIZES: Custom whitelist for the text size picker.
 */
const SAVE_INTERVAL_MS = 2000
const FONT_SIZES = [
  "8pt", "9pt", "10pt", "11pt", "12pt", "14pt", "18pt", 
  "24pt", "30pt", "36pt", "48pt", "60pt", "72pt", "96pt",
]

/* Register custom font sizes with the Quill style attributor */
const Size = Quill.import("attributors/style/size")
Size.whitelist = FONT_SIZES
Quill.register(Size, true)

/* Toolbar Configuration: Grouped by functionality (Formatting, Scripts, Lists, Media) */
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: FONT_SIZES }],
  ["bold", "italic", "underline", "strike", { color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["link", "image", "code-block", "clean"],
]

export default function TextEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  /* Socket Initialization: Establishes connection to the signaling server */
  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  /* Document Fetching: Requests specific document data once socket and editor are ready */
  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable() // Enable editing only after content is loaded
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  /* Auto-Save Logic: Periodically sends current editor state to the server */
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  /* Inbound Changes: Updates the editor when other users emit changes (Deltas) */
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  /* Outbound Changes: Listens for user input and broadcasts Deltas to the socket */
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return // Prevent infinite loops from programmatic updates
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  /* Editor Initialization: Uses a callback ref to ensure the DOM element exists 
     before mounting the Quill instance. 
  */
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = "" // Prevent duplicate toolbars on re-renders
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])

  return <div className="container" ref={wrapperRef}></div>
}