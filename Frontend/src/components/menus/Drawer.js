import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Transform from '@material-ui/icons/Transform';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Star from '@material-ui/icons/Star';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

export default function AppDrawer(props) {
   
    const classes = props.styles;

    console.log(window.location.pathname)

    const [recommendationsActive, setRecommendations] = useState(false)
    const [accountActive, setAccountActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [favActive, setFavActive] = useState(false)
    const [compActive, setCompActive] = useState(false)




    useEffect(() => {
        let location = window.location.pathname

        if (location.includes('recommendations')) setRecommendations(true)
        if (location.includes('account')) setAccountActive(true)
        if (location.includes('search')) setSearchActive(true)
        if (location.includes('favorites')) setFavActive(true)
        if (location.includes('completed')) setCompActive(true)

    }, []);

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
            <List style={{paddingTop: '0px'}}>
                <a className={"unstyled_link " + (recommendationsActive ? 'active_link' : '')}  href={'/recommendations'}>
                    <ListItem button>
                        <ListItemIcon><Transform/></ListItemIcon>
                        <ListItemText primary={"Recommendations"} />
                    </ListItem>
                </a>
                <a className={"unstyled_link " + (searchActive ? 'active_link' : '')}  href={'/search'}>
                    <ListItem button>
                        <ListItemIcon><SearchIcon/></ListItemIcon>
                        <ListItemText primary={"Search"} />
                    </ListItem>
                </a>
                <a className={"unstyled_link " + (accountActive ? 'active_link' : '')}  href={'/account'}>
                    <ListItem button>
                        <ListItemIcon><AccountCircle/></ListItemIcon>
                        <ListItemText primary={"Account"} />
                    </ListItem>
                </a>
                <a className={"unstyled_link " + (favActive ? 'active_link' : '')}  href={'/favorites'}>
                    <ListItem button>
                        <ListItemIcon><Star/></ListItemIcon>
                        <ListItemText primary={"Favorites"} />
                    </ListItem>
                </a>
                <a className={"unstyled_link " + (compActive ? 'active_link' : '')}  href={'/completed'}>
                    <ListItem button>
                        <ListItemIcon><CheckCircleOutline/></ListItemIcon>
                        <ListItemText primary={"Completed"} />
                    </ListItem>
                </a>
             </List>
        </Drawer>
    );
}
