<<<<<<< HEAD
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
=======
import React, { Component } from 'react';
import './index.css';
import StudentForm from './selectmenu/StudentForm';
>>>>>>> 45e9e486dcbe85680c211d4cd1b557abfcc95f26

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

//didnt't wanna fuck up master sorry