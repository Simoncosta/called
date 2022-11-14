import { useContext } from 'react';
import { 
    Outlet, 
    Navigate // instead of "Redirect"
} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function PrivateRoute() {
    const { signed, loading }: any = useContext(AuthContext);

    if(loading) {
        return(
            <div>

            </div>
        );
    }

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return signed ? <Outlet /> : <Navigate to="/" />;
};