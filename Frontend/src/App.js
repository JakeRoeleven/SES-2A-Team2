import React from 'react';

import AppMenu from './components/AppMenu';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import AdminDash from './pages/AdminDash';

function App() {
	
	return ( 
		<>
		    <Router>
				<AppMenu />
				<Switch > 
					<Route exact path="/" component={Home} />
					<Route exact path="/recommendations" component={Recommendations} />
					<Route exact path="/admindash" component={AdminDash} />
				</Switch>
			</Router>
		</>
	)

}

export default App
