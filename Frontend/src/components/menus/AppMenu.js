import React from 'react';
import clsx from 'clsx';

// Material UI Imports
import { AppBar, Toolbar, Typography} from '@material-ui/core';


function AppMenu(props) {

    const classes = props.styles;

    return (
        <AppBar position="fixed"  className={clsx(classes.appBar, {  [classes.appBarShift]: props.open, })}>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    Course Recommendation System
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppMenu;
