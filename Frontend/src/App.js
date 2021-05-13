import React, {useState, useEffect, useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

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
    // App Context
    const {Provider} = AppContext;

    const [subjects, setSubjects] = useState({});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isAuthenticated, setAuth] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [signupComplete, setSignupComplete] = useState(true);


    const checkUserDetails = useCallback(async () => {

		console.log("Checking details")
		
		if (firebase.getCurrentUsername() !== null) {
            setAuth(true);
            let user_id = await firebase.getCurrentUser();
			setLoading(true)
            if (user_id.X) {
                let id = user_id['X']['X'];
				console.log("setting id")
                sessionStorage.setItem('user_id', id);
            }
			await fetch(`http://localhost:8080/api/user/${user_id}`, {
				crossDomain: true,
				mode: 'cors',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}).then(async (res) => {
				let data = await res.json();
				setLoading(false)
				console.log('user')
				if (data.AccountType === 'admin') {
					setIsAdmin(true);
				} else {
					console.log(data)
					if (data.signupComplete) {

						setSignupComplete(true);
						sessionStorage.setItem('favorites', data.favorite_subjects);
						sessionStorage.setItem('courses_completed', data.courses_completed);
					}
				}
			}).catch((err) => {
				setError(true);
				setLoading(false)
			});
        } else {
			if (sessionStorage.getItem('user_id') === null) {
				setAuth(false)
				setLoading(false)
			}
		}

 
    }, [setAuth, setSignupComplete, setIsAdmin]);

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
			localStorage.setItem('hasLoaded', true);
			localStorage.setItem('subjects', JSON.stringify(data));
			localStorage.setItem('cacheTime', cachedTime);
        }).catch((err) => {
            setError(err);
        });
    }, [setSubjects, setError]);

    // Check if Firebase is initialized
    useEffect(() => {

		if (sessionStorage.getItem('user_id') === null) {
			setAuth(false)
			setSignupComplete(false)
		} else {
			const hasLoaded = localStorage.getItem('hasLoaded');
			const subjects = JSON.parse(localStorage.getItem('subjects'));
			const cachedTime = localStorage.getItem('cacheTime');
	
			if (cachedTime < new Date()) {
				fetchSubjects();
			} else if (!hasLoaded && typeof subject !== 'undefined' && subjects.length > 10) {
				fetchSubjects();
			} else {
				setSubjects(subjects);
			}
		}

        // Check user is logged in with firebase
	    checkUserDetails();
		
    }, [fetchSubjects, setSubjects, checkUserDetails, setSignupComplete]);

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
	} else if (isAdmin) {
        return (
            <>
                <Router>
                    <NavWrapper setAuthenticated={setAuth} authenticated={isAuthenticated} signupComplete={signupComplete}>
                        <Provider value={subjects}>
                            <Switch>
                                <Route exact path='/' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} />} />
                                <Route exact path='/login' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} checkUserDetails={checkUserDetails} />} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/forgot-password' component={ForgotPassword} />
                                <Route exact path='/new/student' component={StudentForm} />
                                <Route exact path='/home' component={AdminDash} />
                                <Route exact path='/admin' component={AdminDash} />
                                <Route exact path='/admin/add/course' component={AddCourse} />
                                <Route exact path='/admin/edit/course' component={EditCourse} />
                            </Switch>
                        </Provider>
                    </NavWrapper>
                </Router>
            </>
        );
    } else {
        return (
            <>
                <Router>
                    <NavWrapper setAuthenticated={setAuth} authenticated={isAuthenticated} signupComplete={signupComplete}>
                        <Provider value={subjects}>
                            <Switch>
                                <Route exact path='/' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} />} />
                                <Route exact path='/login' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth}  checkUserDetails={checkUserDetails}/>} />
                                <Route exact path='/register' component={(props) => <Register {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} checkUserDetails={checkUserDetails}/>} />
                                <Route exact path='/forgot-password' component={ForgotPassword} />
                                <Route exact path='/new/student' component={StudentForm} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/home' component={Home} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/recommendations' component={Recommendations} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/search' component={Search} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/account' component={Account} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/favorites' component={LikedCourses} />
                            </Switch>
                        </Provider>
                    </NavWrapper>
                </Router>
            </>
        );
    }
}

export default App;
