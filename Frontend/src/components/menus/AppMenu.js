import React from 'react';
import clsx from 'clsx';

// Material UI Imports
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function AppMenu(props) {

    const classes = props.styles;

    return (
        <AppBar position="fixed"  className={clsx(classes.appBar, {  [classes.appBarShift]: props.open, })}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerOpen} edge="start" className={clsx(classes.menuButton, {[classes.hide]: props.open, })}>
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
