import React, { useState, useEffect, useCallback } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import Private Route
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import LikedCourses from './pages/LikedCourses';

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import {CircularProgress, Typography} from '@material-ui/core';
import Container from '@material-ui/core/Container';

import {AppContext} from './AppContext';

// Firebase Imports
import firebase from './firebase';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentForm from './pages/StudentForm';

function App() {

    const [subjects, setSubjects] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
	const [isAuthenticated, setAuthenticated] = useState(true);

	// App Context
	const { Provider } = AppContext;

	async function checkAuthenticated() {
		if (firebase.getCurrentUsername() == null) {
			setAuthenticated(false);
		} else {
			setAuthenticated(true);
			let user_id = await firebase.getCurrentUser()
			if (user_id.l) sessionStorage.setItem('user_id', user_id.l)
		}		
	}

	function setAuth(val) {
		setAuthenticated(val);
	}

	// Fetch full subject list from API
	const fetchSubjects = useCallback(async () => {
		fetch(`http://${process.env.REACT_APP_SERVER}/api/subjects`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			let data = await res.json();
			setSubjects(data);
			setLoading(false);

			// Record the current date for local storage
			let currentTime = new Date();
			let cachedTime = currentTime.setHours(currentTime.getHours() + 2);

			// Persist the state in local storage
			localStorage.setItem('hasLoaded', true)
			localStorage.setItem('subjects', JSON.stringify(data));
			localStorage.setItem('cacheTime', cachedTime)
		}).catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

    // Check if Firebase is initialized
    useEffect(() => {
        firebase.isInitialized().then((val) => {
			checkAuthenticated();
		});

		const hasLoaded = localStorage.getItem('hasLoaded');
		const subjects = JSON.parse(localStorage.getItem('subjects'));
		const cachedTime = localStorage.getItem('cacheTime');

		if (cachedTime < new Date()) {
			setLoading(true);
			fetchSubjects();
		} else if (!hasLoaded && typeof subject !== 'undefined' && subjects.length > 10) {
			setLoading(true);
			fetchSubjects();
		} else {
			setSubjects(subjects)
		}
    }, [fetchSubjects, setSubjects]);

	if (loading) {
        return (
            <>
                <Skeleton variant='rect' width={'100%'} height={64} />
                <Container maxWidth={false} className={'loadingContainer'}>
                    <CircularProgress size={50} color={'primary'} />
                    <br /><br />
                    <Typography color='textPrimary'>{'Loading Application'}</Typography>
                </Container>
            </>
        );
    } else if (error) {
        return (
            <>
                <Skeleton variant='rect' width={'100%'} height={64} />
                <Container maxWidth={false} className={'loadingContainer'}>
					<Typography color='textPrimary'>{'Failed to load Application'}</Typography>
                </Container>
            </>
        );
    } else {
		return ( 
			<>
				<Router>
					<Switch > 
					
							<Provider value={subjects}>
								<Route exact path="/" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
								<Route exact path="/login" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
								<Route exact path="/register" component={Register} />
								<NavWrapper authenticated={isAuthenticated}>
									<Route exact path="/student-form" component={StudentForm} />
									<PrivateRoute authenticated={isAuthenticated} exact path="/home" component={Home} />
									<PrivateRoute authenticated={isAuthenticated} exact path="/recommendations" component={Recommendations} />
									<PrivateRoute authenticated={isAuthenticated} exact path="/search" component={Search} />
									<PrivateRoute authenticated={isAuthenticated} exact path="/account" component={Account} /> 
									<PrivateRoute authenticated={isAuthenticated} exact path="/liked-courses" component={LikedCourses} /> 
								</NavWrapper>
							</Provider>

					</Switch>
				</Router>
			</>
		)
	}

}

export default App;
