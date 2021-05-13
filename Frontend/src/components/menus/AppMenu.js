import React from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import firebase from '../../firebase';

// Material UI Imports
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LinearProgress from '@material-ui/core/LinearProgress';

function AppMenu(props) {

    const classes = props.styles;
    let history = useHistory();

    const handleLogout = async () => {
        await firebase.logout();
        sessionStorage.removeItem('signup_complete');
        sessionStorage.removeItem('user_id');
        props.setAuthenticated(false);
        history.push("/login");
    } 

    return (
        <>

        <AppBar position="fixed"  className={clsx(classes.appBar, {  [classes.appBarShift]: props.open, })}>
            <Toolbar>
                <img alt='' src={window.location.origin + '/small-light-logo.png'} style={{ cursor: 'pointer', width: '2vw', marginRight: '10px'}} onClick={() => history.push('/home')} ></img>
                <Typography variant='h6' className={classes.title}  style={{ cursor: 'pointer' }} onClick={() => history.push('/home')} >
                    Course Recommender
                </Typography>
                <div style={{marginLeft:'auto'}}>
                    <a href="/account" style={{ color: "inherit" }}>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </a>
                    <IconButton color="inherit" onClick={() => handleLogout()}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </Toolbar>
            <LinearProgress hidden={!props.showProgress} />
        </AppBar>
        </>
    );
}

export default AppMenu;
