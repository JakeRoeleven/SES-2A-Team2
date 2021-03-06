import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppMenu from './student/AppMenu';
import AppDrawer from './student/Drawer';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        marginTop: '150px',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(7) + 1,
        },
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

function StudentMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let alreadySignedUp = sessionStorage.getItem('signup_complete');
    if (window.location.pathname === "/") {
        return (
            <>
                <div className={classes.root} style={{ padding: '0px'}}>
                    <div className={classes.content} style={{ padding: '0px'}}>
                        {props.children}
                    </div>
                </div>
            </>
        );
    } else if (props.authenticated && alreadySignedUp === "true" && window.location.pathname !== "/") {
        return (
            <>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppMenu showProgress={props.showProgress} handleDrawerOpen={handleDrawerOpen} styles={classes} open={false} setAuthenticated={props.setAuthenticated} />
                    <AppDrawer handleDrawerClose={handleDrawerClose} styles={classes} open={open} theme={theme} />
                    <div className={classes.content}>
                        <div className={classes.toolbar} />
                        {props.children}
                    </div>
                </div>
            </>
        );
    } else if (props.authenticated && window.location.pathname !== "/") {
        return (
            <>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppMenu showProgress={props.showProgress} handleDrawerOpen={handleDrawerOpen} styles={classes} open={false} setAuthenticated={props.setAuthenticated} />
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

export default StudentMenu;
