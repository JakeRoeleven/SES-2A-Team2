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

//didnt't wanna fuck up master sorry