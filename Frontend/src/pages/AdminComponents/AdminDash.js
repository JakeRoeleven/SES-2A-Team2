import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import CourseGrid from './CourseGrid';
import {AppContext} from '../../AppContext';
import CourseEditButtons from './CourseEditButtons';

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Alert from '../../components/Alert';

export default function AdminDash() {
    
	const data = useContext(AppContext);
    const [courses, setCourses] = useState([]);
    const [current, setCurrentSelected] = useState([]);
    const [showDelete, setShowDelete] = useState(true);
	
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(false)

    // Convert to a formate useable in the rows
    const dataToRows = useCallback(() => {
        let rows = [];

        for (let i = 0, length = data.length; i < length; i++) {
            let course = data[i];
            course['id'] = course._id;
            rows[i] = course;
        }

        setCourses(rows);
    }, [data, setCourses]);

    // Runs on page load
    useEffect(() => {
        dataToRows();
    }, [dataToRows]);

    const handleSelected = (grid_selected) => {
        let selected = grid_selected;
        setCurrentSelected(selected);	
        setShowDelete(true);
    };

    function handleAdd() {
        console.log('add');
        <Link to='/addcourse'>Add Course</Link>;
    }

    function handleEdit() {
        console.log('edit');
    }

    const handleDelete = () => {
	    setShowDelete(false);
    };
	
    const confirmDelete = () => {

		// Remove from courses
		let rows = [];
        for (let i = 0, length = courses.length; i < length; i++) {
            let course = courses[i];
			if (course && !current.includes(course._id)) {
				course['id'] = course._id;
				rows[i] = course;
			}
        }
        setCourses(rows);

		// Post to server

		// Alert
		setAlertMessage('Course(s) Deleted')
		setShowAlert(true);

        let selected = [];
        setCurrentSelected(selected);	

	    setShowDelete(true);
    };

    return (
        <>
            <div>
                <div>
                    <center>
                        <header>
                            <strong>Admin Dashboard</strong>
                        </header>
                    </center>
                </div>
                <br />

                <div style={{paddingBottom: '10px', textAlign: 'right'}}>
                    <CourseEditButtons current={current} handleDelete={handleDelete} />
                </div>

                <br />
                <Card variant='outlined' hidden={showDelete}>
                    <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <p> Please confirm you wish to delete: </p>
                        <ul>
                            {current.map((code, key) => (
                                <li key={key}> Subject: {code} </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardActions>
                        <Button size='small' onClick={() => setShowDelete(true)}>Cancel</Button>
                        <Button size='small' onClick={() => confirmDelete()}>Confirm Delete</Button>
                    </CardActions>
                </Card>
                <br />

                <CourseGrid rows={courses} handleSelected={handleSelected} />

				<Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </div>
        </>
    );
}
