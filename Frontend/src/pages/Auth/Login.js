import React, {useState} from 'react';
import firebase from '../../firebase';
import {Redirect} from 'react-router-dom';
import {Button, TextField, Typography, Paper} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../../components/Alert';

function Login(props) {
    // Hacky way to override overflow
    document.body.style.overflow = 'hidden';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false)

    async function login() {
        setLoading(true)
        try {
            await firebase.login(email, password).then(() => {
                props.setAuthenticated(true);
                props.checkUserDetails();
                setLoading(false)
            });
        } catch (error) {
            setAlertMessage("Please check your email and password and try again")
            setShowAlert(true)
            setLoading(false)
        }
    }

    const LoginButton = () => {
        if (loading) {
            return <CircularProgress />
        } else {
            return <Button fullWidth={true} variant="contained" color="primary" size='large' onClick={() => login()}> Login </Button>
        }
    }

    if (!props.authenticated) {
        return (
            <>
            <div className={'animateBackground'}>
                <div style={{marginTop: '10%', textAlign: 'center'}}>
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
                        <LoginButton />

                        <br /><br />
                        <a href='/forgot-password'>Forgot Password?</a> <span>&#8226;</span> <a href='/register'> Sign Up </a>
                    </Paper>
                </div>
            </div>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        );
    } else {
        return <Redirect to='/home' />;
    }
    
}

export default Login;
