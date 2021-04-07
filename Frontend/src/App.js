import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import AdminDash from './pages/AdminDash';
import NavWrapper from './components/MenuSystem';
import Search from './pages/Search';
import Account from './pages/Account';
import LikedCourses from './pages/LikedCourses';

function App() {
	
	return ( 
		<>
		    <Router>
				<Switch > 
					<Route exact path="/" component={Home} />
					<Route exact path="/recommendations" component={Recommendations} />
					<Route exact path="/admindash" component={AdminDash} />
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
=======
import React, { Component } from 'react';
import './index.css';
import StudentForm from './selectmenu/StudentForm';

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> Student Interest Form </h3>
        <StudentForm />
      </div>
    );
  }
}

export default App;