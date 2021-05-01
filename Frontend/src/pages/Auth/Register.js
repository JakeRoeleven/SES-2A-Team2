import React, { useState } from 'react';
import firebase from '../../firebase';

function Register(props) {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
	
    async function login() {
        try {
            await firebase.login(email, password).then(() => {
                props.history.replace('/home');
            });
        } catch (error) {
            alert(error);
        }
    }

    async function register() {
        try {
            if (confirmPassword === password) {
                await firebase.register(email, password).then((res)=> {
                    login();
                });
            } else {
                alert("Passwords do not match!");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div style={{padding: '2%'}}>
            <center>
            <h3>Register for Course Recommender</h3>
            <input type='email' placeholder='Email...' id='email_field'  onChange={(e) => setEmail(e.target.value)}/><br /><br />
            <input type='password' placeholder='Password...' id='password_field'  onChange={(e) => setPassword(e.target.value)}/><br /><br />
            <input type='password' placeholder='Password...' id='confirm_password_field'  onChange={(e) => setConfirmPassword(e.target.value)}/><br /><br />
            <button onClick={() => register()}>Register</button><br />
            <p> Have an account? <a href='login'> Log In </a></p>       
            </center>
        </div>
    );
}

export default Register;
