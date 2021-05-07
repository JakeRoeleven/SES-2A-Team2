import React, { useState } from 'react';
import firebase from '../../firebase';
import {Button, TextField, Typography, Paper} from '@material-ui/core';

import Alert from '../../components/Alert';

function ForgotPassword(props) {

    // Hacky way to override overflow
    document.body.style.overflow = 'hidden';

    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    async function resetPassword() {
        try {
            await firebase.resetPassword(email)
            setShowAlert(true)
            setAlertMessage("Please check your email for password reset details")
        } catch (error) {
            setShowAlert(true)
            setAlertMessage(error.message)
        }
    }


        return (
            <div className={'animateBackground'}>
                <div style={{marginTop: '10%', textAlign: 'center'}}>
                <Paper elevation={24} style={{ padding: '1%', width: '400px', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}>
                        
                        <Typography variant='h5' component='h1' gutterBottom>Forgot Password</Typography>
                        <br />

                        <TextField fullWidth={true} id='outlined-basic' label='Email' variant='outlined' type='email' onChange={(e) => setEmail(e.target.value)} />
                       
                        <br />
                        <br />
                        <Button variant="contained" color="primary" size='large' onClick={() => resetPassword()}> Reset Password </Button>

                        <p><a href='/login'> Login </a></p>
                    </Paper>
                </div>
                <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </div>
        );

}

export default ForgotPassword;
