import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

export default function AppDrawer(props) {
    return (
        <Drawer open={props.isOpen} width={400} style={{'top': '64'}}>
            <ListItem>Menu Item 5</ListItem>
            <ListItem>Menu Item 2</ListItem>
        </Drawer>
    );
}
