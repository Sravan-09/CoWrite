import TextEditor from "./TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

/**
 * Main Application Component
 * Manages client-side routing and initial document session creation.
 */
function App() {
  return (
    <Router>
      <Switch>
        {/* Root Redirect: 
            If a user lands on the base URL, generate a unique Version 4 UUID 
            and redirect them to a new document session.
        */}
        <Route path="/" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>

        {/* Document Editor Route: 
            Captures the 'id' parameter from the URL to load a specific 
            document instance within the TextEditor component.
        */}
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App