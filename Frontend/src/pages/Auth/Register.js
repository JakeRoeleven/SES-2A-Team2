import React, { useState } from 'react';
import firebase from '../../firebase';
import {Button, TextField, Typography, Paper} from '@material-ui/core';

import Alert from '../../components/Alert';

function Register(props) {

    // Hacky way to override overflow
    document.body.style.overflow = 'hidden';

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
	
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
                setAlertMessage("Passwords do not match!")
                setShowAlert(true)
            }
        } catch (error) {
            setAlertMessage(error.message)
            setShowAlert(true)
        }
    }

    return (
        <div className={'animateBackground'}>
                <div style={{marginTop: '8%', textAlign: 'center'}}>
                    <img src={window.location.origin + '/small-light-logo.png'} style={{width: '15vw', marginRight: '10px'}}></img>

                    <Paper elevation={24} style={{ padding: '1%', width: '400px', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}>
                        
                        <Typography variant='h5' component='h1' gutterBottom>Course Recommender</Typography>
                        <br />

                        <TextField fullWidth={true} id='outlined-basic' label='Email' variant='outlined' type='email' onChange={(e) => setEmail(e.target.value)} />

                        <br />
                        <br />
                        <TextField fullWidth={true} id='outlined-basic' label='Password' variant='outlined' type='password' onChange={(e) => setPassword(e.target.value)} />
                        
                        <br />
                        <br />
                        <TextField fullWidth={true} id='outlined-basic' label='Confirm Password' variant='outlined' type='password' onChange={(e) => setConfirmPassword(e.target.value)} />

                        <br />
                        <br />
                        <Button variant="contained" color="primary" size='large' onClick={() => register()}> Register </Button>

                        <br />

                        <p><a href='/login'> Login </a></p>
                    </Paper>
                </div>
                <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
        </div>
    );
}

export default Register;
