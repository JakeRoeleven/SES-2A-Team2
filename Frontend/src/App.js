import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import LikedCourses from './pages/LikedCourses';
import AdminDash from './pages/AdminComponents/AdminDash';
import AddCourse from './pages/AdminComponents/AddCourse';

function App() {
	
	return ( 
		<>
		    <Router>
				<Switch > 
					<Route exact path="/" component={Home} />
					<Route exact path="/recommendations" component={Recommendations} />
					<Route exact path="/admindash" component={AdminDash} />
					<Route exact path="/addcourse" component={AddCourse} />
					<NavWrapper>
						<Route exact path="/" component={Home} />
						<Route exact path="/recommendations" component={Recommendations} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/account" component={Account} /> 
						<Route exact path="/liked-courses" component={LikedCourses} /> 
					</NavWrapper>
				</Switch>
			</Router>
		</>
	)
}

export default App;