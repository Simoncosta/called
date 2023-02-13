import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndex from "./routes";
import "./index.css"
import AuthProvider from "./contexts/auth";

import 'react-toastify/dist/ReactToastify.css';

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
