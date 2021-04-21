import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

const all_faculties = ['Analytics and Data Science', 'Business', 'Communication', 'Creative Intelligence and Innovation',
'Design Architecture and Building', 'Education', 'Engineering', 'Health', 'Information Technology', 'International Studies',
'Law', 'Science', 'Transdisciplinary Innovation']

function FacultyDropdown(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleChange = (event) => {
        props.setFaculty(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>Faculty</InputLabel>
            <Select
                labelId='demo-controlled-open-select-label'
                id='demo-controlled-open-select'
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={props.faculty}
                onChange={handleChange}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {all_faculties.map((item) => <MenuItem value={item}> {item} </MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default FacultyDropdown;
