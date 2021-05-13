import React, {useState, useEffect, useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import Private Route
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDash from './pages/AdminComponents/AdminDash';

// Material UI
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
import NewStudentRoute from './components/NewStudentRoute';
import Subject from './pages/Subject';
import Favorites from './pages/Favorites';
import Completed from './pages/Completed';

function App() {
    // App Context
    const {Provider} = AppContext;

    const [subjects, setSubjects] = useState({});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isAuthenticated, setAuth] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [signupComplete, setSignupComplete] = useState(false);

    const [showProgress, setShowProgress] = useState(false);
   
    // Fetch full subject list from API
    const fetchSubjects = useCallback(async (withLoading) => {

        if (withLoading) setLoading(true)

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
            if (withLoading) setLoading(false)

			// Record the current date for local storage
			let currentTime = new Date();
			let cachedTime = currentTime.setHours(currentTime.getHours() + 2);

			// Persist the state in local storage
			localStorage.setItem('hasLoaded', true);
			localStorage.setItem('subjects', JSON.stringify(data));
			localStorage.setItem('cacheTime', cachedTime);

        }).catch((err) => {
            setError(err);
            if (withLoading) setLoading(false)
        });
    }, [setSubjects, setError]);

    const checkUserDetails = useCallback(async () => {

		if (firebase.getCurrentUsername() !== null) {
            setAuth(true);
            let user_id = await firebase.getCurrentUser();
			setLoading(true)
            if (user_id.X) {
                let id = user_id['X']['X'];
				console.log("setting id")
                sessionStorage.setItem('user_id', id);
                await fetch(`http://${process.env.REACT_APP_SERVER}/api/user/${id}`, {
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
                    if (data.AccountType === 'admin') {
                        setIsAdmin(true);
                    } else {
                        if (data.signupComplete) {
                            fetchSubjects();
                            setSignupComplete(true);
                            sessionStorage.setItem('favorites', data.favorite_subjects);
                            sessionStorage.setItem('complete', data.courses_completed);
                            sessionStorage.setItem('signup_complete', true);
                        } else {
                            setSignupComplete(false);
                        }
                    }
                }).catch((err) => {
                    setError(true);
                    setLoading(false)
                });
            } else {
                setAuth(false)
				setLoading(false)
            }
        } else {
			if (sessionStorage.getItem('user_id') === null) {
				setAuth(false)
				setLoading(false)
			}
		}

 
    }, [setAuth, fetchSubjects, setSignupComplete, setIsAdmin]);

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
                <Container maxWidth={false} className={'loadingContainer'}>
                    <CircularProgress size={50} color={'primary'} />
                    <br /><br />
                    <Typography color='textPrimary'>{'Loading Application'}</Typography>
                </Container>
            </>
        );
	} if (error) {
        return (
            <>
                <Container maxWidth={false} className={'loadingContainer'}>
                    <br /><br />
                    <Typography color='textPrimary'>{'Application Error'}</Typography>
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
                    <NavWrapper showProgress={showProgress} setAuthenticated={setAuth} authenticated={isAuthenticated} signupComplete={signupComplete}>
                        <Provider value={subjects}>
                            <Switch>
                                <Route exact path='/' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} />} />
                                <Route exact path='/login' component={(props) => <Login {...props} authenticated={isAuthenticated} setAuthenticated={setAuth}  checkUserDetails={checkUserDetails}/>} />
                                <Route exact path='/register' component={(props) => <Register {...props} authenticated={isAuthenticated} setAuthenticated={setAuth} checkUserDetails={checkUserDetails}/>} />
                                <Route exact path='/forgot-password' component={ForgotPassword} />
                                <NewStudentRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/new/student' component={(props) => <StudentForm {...props} setSignupComplete={setSignupComplete} fetchSubjects={fetchSubjects}/>} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/home' component={Home} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/subject' component={Subject} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/recommendations' component={Recommendations} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/search' component={(props) => <Search {...props} setShowProgress={setShowProgress} />} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/account' component={Account} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/favorites' component={Favorites} />
                                <PrivateRoute signupComplete={signupComplete} authenticated={isAuthenticated} exact path='/completed' component={Completed} />
                            </Switch>
                        </Provider>
                    </NavWrapper>
                </Router>
            </>
        );
    }
}

export default App;
