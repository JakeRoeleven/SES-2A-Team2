import React from 'react';

// Material UI Imports
import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function AppMenu(props) {

    const classes = useStyles();

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton onClick={props.open} edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                    Course Recommendation System
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppMenu;
