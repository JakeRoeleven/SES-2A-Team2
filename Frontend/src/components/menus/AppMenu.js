import React from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import firebase from '../../firebase';

// Material UI Imports
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function AppMenu(props) {

    const classes = props.styles;
    let history = useHistory();

    const handleLogout = async () => {
        await firebase.logout();
        props.setAuthenticated(false)
        history.push("/login");
    } 


    return (
        <AppBar position="fixed"  className={clsx(classes.appBar, {  [classes.appBarShift]: props.open, })}>
            <Toolbar>
                <img src={window.location.origin + '/small-light-logo.png'} style={{ width: '2vw', marginRight: '10px'}}></img>
                <Typography variant='h6' className={classes.title}>
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
        </AppBar>
    );
}

export default AppMenu;
