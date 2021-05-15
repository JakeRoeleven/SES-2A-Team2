import React, {useCallback, useContext, useEffect, useState} from 'react';

import CourseGrid from './CourseGrid';
import StudentGrid from './StudentGrid';

import {AppContext} from '../../AppContext';
import CourseEditButtons from './CourseEditButtons';

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Alert from '../../components/Alert';

import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {CircularProgress} from '@material-ui/core';
import StudentEditButtons from './StudentEditButtons';


export default function AdminDash() {
    
    let history = useHistory();

	const data = useContext(AppContext);
    const [courses, setCourses] = useState([]);
    const [current, setCurrentSelected] = useState([]);
    const [currentStudentsNames, setCurrentStudentsNames] = useState([]);
    const [showDelete, setShowDelete] = useState(true);
	
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(false);

    const [studentMode, setStudentMode] = useState(false);
    const [students, setStudents] = useState(false)
    const [loading, setLoading] = useState(false)

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
        
        if (studentMode) {
            let names = []
            students.forEach(elem => {
                if (selected.includes(elem.id)) {
                    names.push(elem.name);
                }
            });
            setCurrentStudentsNames(names);
        } else {
            setCurrentStudentsNames([]);
        }

        setShowDelete(true);
    };

    function handleAdd() {
        history.push("/admin/add/course");
    }

    function handleEdit() {
        history.push(`/admin/edit/course?id=${current}`);
    }

    const changeMode = () => {
        setStudentMode(!studentMode);
        let empty = [];
        setCurrentSelected(empty);
        if (students === false) {
            setLoading(true);
            fetch(`https://api.courses4you.club/api/admin/students`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (res) => {
                    let data = await res.json()
                    let rows = [];
                    for (let i = 0, length = data.length; i < length; i++) {
                        let student = data[i];
                        student['id'] = student._id;
                        rows[i] = student;
                    }
                    setStudents(rows);
                    setLoading(false);
            }).catch((e) => {
                setLoading(false);
            });
        }
    }

    // Delete Functions
    const handleDelete = () => {
	    setShowDelete(false);
    };
	
    const confirmDelete = () => {

		// Post to server
        current.forEach(async (id) => {

            // Post to server
            await fetch(`https://api.courses4you.club/api/admin/subject/delete/${id}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (res) => {
                // Alert
                setAlertMessage('Course(s) Deleted')
                setShowAlert(true);
            }).catch(() => {
                // Alert
                setAlertMessage('Failed to delete course')
                setShowAlert(true);
            });
        });

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

        let selected = [];
        setCurrentSelected(selected);	

	    setShowDelete(true);
    };

    // Delete Student Functions
    const handleStudentDelete = () => {
        setShowDelete(false);
    };
    
    const confirmStudentDelete = async () => {

        current.forEach(async (id) => {

            // Post to server
            await fetch(`https://api.courses4you.club/api/admin/student/delete/${id}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (res) => {
                // Alert
                setAlertMessage('Student(s) Deleted')
                setShowAlert(true);
            }).catch(() => {
                // Alert
                setAlertMessage('Failed to delete student')
                setShowAlert(true);
            });
        });

        // Remove from courses
		let rows = [];
        for (let i = 0, length = students.length; i < length; i++) {
            let student = students[i];
			if (student && !current.includes(student._id)) {
				student['id'] = student._id;
				rows[i] = student;
			}
        }
        setStudents(rows);

        let selected = [];
        setCurrentSelected(selected);	
        setCurrentStudentsNames(selected);
        setShowDelete(true);

    };

    if (loading) {
        return (
            <>
                <Container maxWidth={false} className={'loadingContainer'}>
                    <CircularProgress size={50} color={'primary'} />
                    <br /><br />
                    <Typography color='textPrimary'>{'Finding Students (This may take a minute!)'}</Typography>
                </Container>
            </>
        );
    } else if (!studentMode) {
        return (
            <>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant='h5' style={{ paddingTop: '10px' }}> Course Admin
                                <Button  variant="outlined" style={{ marginLeft: '30px' }} size='small' onClick={() => changeMode()}> Student Mode </Button>
                            </Typography>
          
                        </Grid>
    
                        <Grid item xs={8} style={{ textAlignLast: 'right'}}>
                            <CourseEditButtons current={current} handleDelete={handleDelete} handleAdd={handleAdd} handleEdit={handleEdit}/>
                        </Grid>
    
                    </Grid>
    
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
                        <CardActions style={{ float: 'right' }} >
                            <Button style={{ float: 'right' }} variant='contained' color='secondary' size='small' onClick={() => setShowDelete(true)}>Cancel</Button>
                            <Button style={{ float: 'right' }} variant='contained' color='primary' size='small' onClick={() => confirmDelete()}>Confirm Delete</Button>
                        </CardActions>
                    </Card>
                    <br />
    
                    <CourseGrid rows={courses} handleSelected={handleSelected} />
    
                    <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
    
                </Container>
            </>
        );
    } else {
        return (
            <>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant='h5' style={{ paddingTop: '10px' }}> Student Admin
                                <Button  variant="outlined" style={{ marginLeft: '30px' }} size='small' onClick={() => changeMode()}> Course Mode </Button>
                            </Typography>
          
                        </Grid>
    
                        <Grid item xs={8} style={{ textAlignLast: 'right'}}>
                            <StudentEditButtons current={current} handleDelete={handleStudentDelete} />
                        </Grid>
    
                    </Grid>

                    <br />
                    <Card variant='outlined' hidden={showDelete}>
                        <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                            <p> Please confirm you wish to delete: </p>
                            <ul>
                                {currentStudentsNames.map((code, key) => (
                                    <li key={key}> Student: {code} </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardActions style={{ float: 'right' }} >
                            <Button style={{ float: 'right' }} variant='contained' color='secondary' size='small' onClick={() => setShowDelete(true)}>Cancel</Button>
                            <Button style={{ float: 'right' }}  variant='contained' color='primary' size='small' onClick={() => confirmStudentDelete()}>Confirm Delete</Button>
                        </CardActions>
                    </Card>
                    <br />
    
             
                    <StudentGrid rows={students} handleSelected={handleSelected} />
    
                    <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
    
                </Container>
            </>
        );
    }

}
