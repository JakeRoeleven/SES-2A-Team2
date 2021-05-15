import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const NewStudentRoute = ({ component: Component, authenticated, signupComplete, ...rest}) => {
    let alreadySignedUp = sessionStorage.getItem('signup_complete');
    if (authenticated && signupComplete && alreadySignedUp !== "true") {
        return <Redirect to="/home" />
    } else {
        return <Route {...rest} render={(props) => (authenticated ?  <Component {...props} /> : <Redirect to="/home" />)} />
    }
};

export default NewStudentRoute;
