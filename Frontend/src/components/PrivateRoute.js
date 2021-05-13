import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, authenticated, signupComplete, ...rest}) => {


    if (authenticated && !signupComplete) {
        return <Redirect to="/new/student" />
    } else {
        return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    }

};

export default PrivateRoute;
