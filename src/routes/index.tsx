import { Fragment } from "react";
import {
    Routes, // instead of "Switch"
    Route
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

export default function RoutesIndex() {
    return(
        <Fragment>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/profile' element={<Profile />}/>
                </Route>
                <Route path='/' element={<SignIn />}/>
                <Route path='/register' element={<SignUp />}/>
            </Routes>
      </Fragment>
    );
}
