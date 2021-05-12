import React, { useState, useEffect, useCallback } from 'react';
import {BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';

// Import Private Route
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import LikedCourses from './pages/Favorites';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDash from './pages/AdminComponents/AdminDash';

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
import AddCourse from './pages/AdminComponents/AddCourse';
import EditCourse from './pages/AdminComponents/EditCourse';

function App() {


    const [subjects, setSubjects] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
	const [isAuthenticated, setAuthenticated] = useState(true);
	const [signupComplete, setSignupComplete] = useState(true);
	const [isAdminPage, setIsAdminPage] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false)

	// App Context
	const { Provider } = AppContext;

	const checkSignupComplete = useCallback(async(id) => {

		let is_admin = false 
		await fetch(`http://localhost:8080/api/admin/${id}`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			is_admin = await res.json();
			if (is_admin) {
				setIsAdminPage(true)
				setIsAdmin(true)
				setLoading(false);
				return <Redirect to="/admin" />
			}
		})

		if (!is_admin) {
			await fetch(`http://localhost:8080/api/student/signup_complete/${id}`, {
				crossDomain: true,
				mode: 'cors',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}).then(async (res) => {
				let data = await res.json();
				setSignupComplete(data);
				checkUserDetails(id);
			}).catch((err) => {
				console.log(err)
			}).then(() => {
				setLoading(false);
			});
		}

	}, []);

	const checkAuthenticated = useCallback(async () => {
		if (firebase.getCurrentUsername() == null) {
			setAuthenticated(false);
			setSignupComplete(false);
			setLoading(false)
		} else {
			setAuthenticated(true);
			let user_id = await firebase.getCurrentUser()
			if (user_id.X) {
				let id = user_id['X']['X'];
				sessionStorage.setItem('user_id', id);
				checkSignupComplete(id)
			} 
		}		
	}, [checkSignupComplete]);

	async function checkUserDetails(id) {
		
		await fetch(`http://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			let data = await res.json();
			sessionStorage.setItem('favorites', data.favorite_subjects);
			sessionStorage.setItem('courses_completed', data.courses_completed)
			setLoading(false)
		}).catch((err) => {
			console.log(err)
			setLoading(false)
		}).then(() => {
			setLoading(false);
		});
		

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

		firebase.isInitialized().then(() => {
			checkAuthenticated();
		});


    }, [fetchSubjects, setSubjects, checkAuthenticated]);

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
    } else if (isAdmin) {
		return ( 
		<>
		<Router>
				<NavWrapper setAuthenticated={setAuthenticated} authenticated={isAuthenticated} signupComplete={signupComplete} isAdminPage={isAdminPage}>
						<Provider value={subjects}>
							<Switch > 
								<Route exact path="/" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
								<Route exact path="/login" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/forgot-password" component={ForgotPassword} />
								<Route exact path="/new/student" component={StudentForm} />
								<Route exact path="/home" component={AdminDash} />
								<Route exact path="/admin" component={AdminDash} />
								<Route exact path="/admin/add/course" component={AddCourse} />
								<Route exact path="/admin/edit/course" component={EditCourse} />
							</Switch>
						</Provider>
					</NavWrapper>
			</Router>
		</>	
		)
	} else {
		return ( 
			<>
				<Router>
			
					<NavWrapper setAuthenticated={setAuthenticated} authenticated={isAuthenticated} signupComplete={signupComplete} isAdminPage={isAdminPage}>
							<Provider value={subjects}>
								<Switch > 
									<Route exact path="/" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
									<Route exact path="/login" component={(props) => ( <Login {...props}  authenticated={isAuthenticated} setAuthenticated={setAuth} /> )} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/forgot-password" component={ForgotPassword} />
									<Route exact path="/new/student" component={StudentForm} />
									<Route exact path="/admin" component={AdminDash} />
									<Route exact path="/admin/add/course" component={AddCourse} />
									<Route exact path="/admin/edit/course" component={EditCourse} />
									<PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path="/home" component={Home} />
									<PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path="/recommendations" component={Recommendations} />
									<PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path="/search" component={Search} />
									<PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path="/account" component={Account} /> 
									<PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path="/favorites" component={LikedCourses} /> 
								</Switch>
							</Provider>
						</NavWrapper>
				</Router>
			</>
		)
	}

}

export default App;
