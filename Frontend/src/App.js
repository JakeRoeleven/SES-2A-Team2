import React from 'react';
import './index.css';
import StudentForm from './selectmenu/StudentForm';
import CourseForm from './selectmenu/CourseForm';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div classname ="style">
      <h1>Student Form</h1>
      <CourseForm />
    </div>
    </Router>
  );
}

export default App;

//didnt't wanna fuck up master sorry