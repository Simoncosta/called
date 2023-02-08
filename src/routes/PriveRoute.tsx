import {
    Outlet, 
    Navigate
} from 'react-router-dom';

export default function PrivateRoute() {

    const signed = false;

    return signed ? <Outlet /> : <Navigate to="/" />;
}