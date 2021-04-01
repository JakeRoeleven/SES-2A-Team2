import React from 'react';
import AppMenu from './menus/AppMenu';
import AppDrawer from './menus/Drawer';

function NavWrapper(props) {

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <>
            <AppMenu open={handleDrawerOpen}/>
            <AppDrawer isOpen={open} close={handleDrawerClose}/>
            <div className={'LOL'}>{props.children}</div>
        </>
    );

}

export default NavWrapper;
