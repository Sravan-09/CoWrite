import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles.css"

/**
 * Entry point for the React application.
 * Mounts the component tree to the physical DOM.
 */
ReactDOM.render(
  /* React.StrictMode: Development-only tool that highlights 
     potential problems such as unsafe lifecycles or deprecated APIs.
  */
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  /* Target Container: Matches the 'root' ID defined in public/index.html 
  */
  document.getElementById("root")
)