import React, { useState } from 'react';
import firebase from '../../firebase';

function ForgotPassword(props) {

    const [email, setEmail] = useState('');

    async function resetPassword() {
        try {
            await firebase.resetPassword(email)
        } catch (error) {
            alert(error.message);
        }
    }


        return (
            <div style={{padding: '2%'}}>
                <center>
                <h3>Reset Password</h3>
                <input type='email' placeholder='Email...' id='email_field'  onChange={(e) => setEmail(e.target.value)}/><br /><br />
                <button onClick={() => resetPassword()}>Reset Password</button><br />  
                </center>
            </div>
        );

}

export default ForgotPassword;
