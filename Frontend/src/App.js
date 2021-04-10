import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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

function App() {

    const [subjects, setSubjects] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

	// App Context
	const { Provider } = AppContext;

	// Fetch full subject list from API
    const fetchSubjects = useCallback(async () => {
		fetch('http://178.128.216.237:8080/api/subjects', {
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

		//fetchSubjects();
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
                    <Switch>
                        <NavWrapper>
							<Provider value={subjects}>
								<Route exact path='/' component={Home} />
								<Route
									exact
									path='/recommendations'
									component={Recommendations}
								/>
								<Route exact path='/search' component={Search} />
								<Route exact path='/account' component={Account} />
								<Route
									exact
									path='/liked-courses'
									component={LikedCourses}
								/>
							</Provider>
                        </NavWrapper>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App;
