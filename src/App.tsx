import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndex from "./routes";
import "./index.css"
import AuthProvider from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesIndex />
      </Router>
    </AuthProvider>
  )
}

export default App
