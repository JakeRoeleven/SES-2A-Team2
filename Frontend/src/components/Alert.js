import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
    return <Slide {...props} direction='left' />;
}

const Alert = (props) => {
    const transition = 'TransitionLeft';

    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            autoHideDuration={2000}
            TransitionComponent={TransitionLeft}
            message={props.message}
            key={transition ? transition.name : ''}
            onClose={props.close}
        />
    );
};

export default Alert;
