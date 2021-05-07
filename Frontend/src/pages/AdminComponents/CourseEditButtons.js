import React, {useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#3f51b5 !important',
        color: '#fff !important',
        marginRight: '1em !important',
        borderRadius: '4px !important',
        padding: '5px !important',
		paddingLeft: '10px !important',
		paddingRight: '10px !important',
        '&:hover': {
            backgroundColor: 'rgb(17, 82, 147) !important',
        },
    },
    buttonDisabled: {
        backgroundColor: '#00000042 !important',
        color: '#fff !important',
        marginRight: '1em !important',
        borderRadius: '4px !important',
        padding: '5px !important',
    },
	buttonDelete: {
        backgroundColor: '	#cb234d !important',
        color: '#fff !important',
        marginRight: '1em !important',
        borderRadius: '4px !important',
        padding: '5px !important',
    }
}));

export default function CourseEditButtons(props) {
    
	const [empty, setEmpty] = useState(false);
    const [single, setSingle] = useState(false);
    const [multiple, setMultiple] = useState(false);

    useEffect(() => {
        let selected = props.current;
		console.log(selected.length)
        if (selected.length < 1) {
            setEmpty(true);
			setSingle(false);
			setMultiple(false)
        } else if (selected.length === 1) {
            setSingle(true);
			setEmpty(false);
			setMultiple(false)
        } else {
			setSingle(false);
			setEmpty(false);
			setMultiple(true)
        }

    }, [props.current]);

    const classes = useStyles();

    if (empty) {
        return (
            <>
                <Button className={classes.button} onClick={() => props.handleAdd()}>Add Course</Button>
                <Button className={classes.buttonDisabled} disabled>Delete Course</Button>
            </>
        );
    } else if (single){
        return (
            <>
                <Button className={classes.button} onClick={() => props.handleAdd()}>Add Course</Button>
                <Button className={classes.buttonDelete} onClick={() => props.handleDelete()}>Delete Course</Button>
				<Button className={classes.button} onClick={() => props.handleEdit()}>Edit Course: {props.current}</Button>
            </>
        );
	} else {
        return (
            <>
                <Button className={classes.button} onClick={() => props.handleAdd()}>Add Course</Button>
                <Button className={classes.buttonDelete} onClick={() => props.handleDelete()}>Delete Courses</Button>
            </>
        );
    }
}
