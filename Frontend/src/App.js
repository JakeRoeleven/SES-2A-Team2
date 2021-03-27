import React from 'react';

import AppMenu from './components/AppMenu';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';

function App() {
	
	return ( 
		<>
		    <Router>
				<AppMenu />
				<Switch > 
					<Route exact path="/" component={Home} />
					<Route exact path="/recommendations" component={Recommendations} /> 
				</Switch>
			</Router>
		</>
	)

}

export default App
