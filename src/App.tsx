import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import RoutesIndex from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ToastContainer autoClose={3000} />
                <RoutesIndex />
            </Router>
        </AuthProvider>
    );
}

export default App;
