import React, { useState } from 'react';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';

function Login(props) {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
    async function login() {
        try {
            await firebase.login(email, password).then(()=> {
                props.setAuthenticated(true);
            });
        } catch (error) {
            alert(error.message);
        }
    }

    if (!props.authenticated) {
        return (
            <div style={{padding: '2%'}}>
                <center>
                <img src={window.location.origin + '/course-logo.png'} style={{ width: '10vw', marginRight: '10px'}}></img>
                <h3>Login to Course Recommender</h3>
                <input type='email' placeholder='Email...' id='email_field'  onChange={(e) => setEmail(e.target.value)}/><br /><br />
                <input type='password' placeholder='Password...' id='password_field'  onChange={(e) => setPassword(e.target.value)}/><br /><br />
                <button onClick={() => login()}>Login to Account</button><br />  
                <p> <a href="/forgot-password" > Forgot Password? </a></p>   
                <p> Need an account <a href='/register'> Sign Up </a></p>   
                </center>
            </div>
        );
    } else {
        return (<Redirect to="/home" />)
    }

}

export default Login;
