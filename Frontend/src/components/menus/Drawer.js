import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Transform from '@material-ui/icons/Transform';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Favorite from '@material-ui/icons/Favorite';

export default function AppDrawer(props) {
   
    const classes = props.styles;

    return (
        <Drawer
            variant='permanent'
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
        >
            <div className={classes.toolbar}>
            </div>
            <List>
                <a className="unstyled_link" href={'/recommendations'}>
                    <ListItem button>
                        <ListItemIcon><Transform/></ListItemIcon>
                        <ListItemText primary={"Recommendations"} />
                    </ListItem>
                </a>
                <a className="unstyled_link" href={'/search'}>
                    <ListItem button>
                        <ListItemIcon><SearchIcon/></ListItemIcon>
                        <ListItemText primary={"Search"} />
                    </ListItem>
                </a>
                <a className="unstyled_link"  href={'/account'}>
                    <ListItem button>
                        <ListItemIcon><AccountCircle/></ListItemIcon>
                        <ListItemText primary={"Account"} />
                    </ListItem>
                </a>
                <a className="unstyled_link" href={'/liked-courses'}>
                    <ListItem button>
                        <ListItemIcon><Favorite/></ListItemIcon>
                        <ListItemText primary={"Favorites"} />
                    </ListItem>
                </a>
             </List>
        </Drawer>
    );
}
