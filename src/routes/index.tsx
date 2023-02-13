import { Fragment } from "react";
import {
    Routes,
    Route
} from 'react-router-dom'
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PriveRoute";

export default function RoutesIndex() {
    return(
        <Fragment>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/customers" element={<Customers />} />
                </Route>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>
        </Fragment>
    );
}