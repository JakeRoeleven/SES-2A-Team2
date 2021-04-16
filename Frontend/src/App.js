import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Private Route
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import LikedCourses from './pages/LikedCourses';

// Firebase Imports
import firebase from './firebase';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {

	const [isAuthenticated, setAuthenticated] = useState(false);

    // Check if Firebase is initialized
    useEffect(() => {
        firebase.isInitialized().then((val) => {
			checkAuthenticated();
        });
    });

	function checkAuthenticated() {
		console.log(firebase.getCurrentUsername())
		if (firebase.getCurrentUsername() == null) {
			setAuthenticated(false);
		} else {
			setAuthenticated(true);
		}		
	}

	function setAuth(val) {
		setAuthenticated(val);
	}

	
	return ( 
		<>
		    <Router>
				<Switch > 
					<NavWrapper authenticated={isAuthenticated}>
						<Route exact path="/" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
						<Route exact path="/login" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
						<Route exact path="/register" component={Register} />
						<PrivateRoute authenticated={isAuthenticated} exact path="/home" component={Home} />
						<PrivateRoute authenticated={isAuthenticated} exact path="/recommendations" component={Recommendations} />
						<PrivateRoute authenticated={isAuthenticated} exact path="/search" component={Search} />
						<PrivateRoute authenticated={isAuthenticated} exact path="/account" component={Account} /> 
						<PrivateRoute authenticated={isAuthenticated} exact path="/liked-courses" component={LikedCourses} /> 
					</NavWrapper>
				</Switch>
			</Router>
		</>
	)

}

export default App
