import React from 'react';

import { AppBar, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import firebase from '../../firebase';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AdminMenu(props) {

    const classes = useStyles();
    let history = useHistory();

    const handleLogout = async () => {
        await firebase.logout();
        sessionStorage.removeItem('signup_complete');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('isAdmin');
        props.setAuthenticated(false);
        history.push("/login");
    } 

    if (props.authenticated) {
        return (
            <>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
                        <Toolbar>
                            <img alt='' src={window.location.origin + '/small-light-logo.png'} style={{cursor: 'pointer', width: '2vw', marginRight: '10px'}} onClick={() => history.push('/home')}></img>
                            <Typography variant='h6' className={classes.title} style={{cursor: 'pointer'}} onClick={() => history.push('/home')}>
                                Course Recommender
                            </Typography>
                            <Divider orientation="vertical" flexItem light={true} style={{ marginRight: '15px', marginLeft: '15px', marginTop: 'auto', marginBottom: 'auto', height: '25px', backgroundColor: 'white', width: '2px'}}/>
                            <Chip label="Admin Mode" variant="outlined" style={{ color: 'white', borderColor: 'white' }} />
                            <div style={{marginLeft: 'auto'}}>
                                <IconButton color='inherit' onClick={() => handleLogout()}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.content}>
                        <div className={classes.toolbar} />
                        {props.children}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </div>
            </div>
        );
    }
}

export default AdminMenu;
