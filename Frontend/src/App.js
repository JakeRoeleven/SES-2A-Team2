import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import NavWrapper from './components/MenuSystem';

function App() {
	
	return ( 
		<>
		    <Router>
				<Switch > 
					<NavWrapper>
						<Route exact path="/" component={Home} />
						<Route exact path="/recommendations" component={Recommendations} /> 
					</NavWrapper>
				</Switch>
			</Router>
		</>
	)

}

export default App
