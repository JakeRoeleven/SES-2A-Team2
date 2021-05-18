import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, authenticated, signupComplete, ...rest}) => {
    let alreadySignedUp = sessionStorage.getItem('signup_complete');
    debugger;
    if (authenticated && !signupComplete && alreadySignedUp !== "true") {
        return <Redirect to="/new/student" />
    } else {
        return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    }
};

export default PrivateRoute;
