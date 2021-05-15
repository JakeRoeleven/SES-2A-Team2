import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, authenticated, signupComplete, ...rest}) => {
    return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : <Redirect to="/admin" />)} />
};

export default PrivateRoute;
