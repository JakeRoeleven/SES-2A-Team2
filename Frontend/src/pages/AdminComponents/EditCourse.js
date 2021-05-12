import React, {useContext, useEffect, useState} from 'react';

import {Grid, Container, CssBaseline, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {Form, Label, StepDescription} from 'semantic-ui-react';
import MajorSelect from '../../components/MajorSelect';

import {useHistory} from 'react-router-dom';

import {AppContext} from '../../AppContext';


function EditCourse(props) {

    let history = useHistory();
    const data = useContext(AppContext);

    const [courseID, setCourseID] = useState('');
    const [courseName, setCourseName] = useState('');
    const [creditPoints, setCreditPoints] = useState('');
    const [postgraduate, setPostgraduate] = useState(false);
    const [faculty, setFaculty] = useState('');
    const [coursePrerequisites, setPre] = useState('');
    const [courseAntirequisites, setAnti] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const editCourse = async () => {
        // fetch(`http://localhost:8080/api/new-subject`, {
        //     crossDomain: true,
        //     mode: 'cors',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     body: JSON.stringify({
        //         id: courseID,
        //         courseData: {
        //             course_name: courseName,
        //             credit_points: creditPoints,
        //             'pre-requisites': coursePrerequisites,
        //             'anti-requisites': courseAntirequisites,
        //             postgraduate: postgraduate,
        //             faculty: faculty,
        //             description: courseDescription,
        //             link: '#',
        //         },
        //     }),
        // })
        //     .then(async (res) => {
        //         let data = await res.json();
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    useEffect(() => {

        let search = props.location.search

        if (search) {
            let value = search.split('=')[1]
            for (let i = 0, length = data.length; i < length; i++) {
                let course = data[i];
                if (value == course._id) {
                    console.log(course)
                    setCourseID(course._id)
                    setCourseName(course.course_name)
                    setCreditPoints(course.credit_points.replace(/\D/g,''))
                    setPostgraduate(course.postgraduate)
                    setPre(course['pre-requisites'])
                    setAnti(course['anti-requisites'])
                    setCourseDescription(course.description)
                    setFaculty(course.faculty)
                }

            }
        } else {
            history.push("/admin");
        }
    });

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container spacing={3} style={{marginBottom: '1%'}}>
                    <Grid item xs={6}>
                        <Typography variant='h5'> Edit A Course </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button style={{float: 'right'}} variant='contained' color='primary' onClick={() => history.push('/admin')}>
                            {' '}
                            Return To Admin Dashboard{' '}
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Card style={{padding: '2%', overflow: 'visible'}}>
                <Form>
                    <TextField id='outlined-disabled' label='Course ID' variant='outlined' style={{marginRight: '2%'}} value={courseID} onChange={(e) => setCourseID(e.target.value)} />

                    <TextField id='outlined-disabled' label='Course Name' variant='outlined' style={{marginRight: '2%'}} value={courseName} onChange={(e) => setCourseName(e.target.value)} />

                    <FormControl variant='outlined' style={{minWidth: '160px', marginRight: '2%'}}>
                        <InputLabel htmlFor='outlined-age-native-simple'>Credit Points</InputLabel>
                        <Select defaultValue={creditPoints} value={creditPoints} onChange={(e) => setCreditPoints(e.target.value)} label='Degree Year'>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel control={<Checkbox checked={postgraduate} onChange={() => setPostgraduate(!postgraduate)} />} label='Postgraduate' color="primary"/>
                    
                    <br /><br />
                    <Label style={{  marginBottom: '10px', fontStyle: 'italic' }}>List as comma separated values</Label>
                    <TextField id='outlined-disabled' label='Course Pre-requisites' fullWidth={true} variant='outlined' style={{marginRight: '2%'}} value={coursePrerequisites} onChange={(e) => setPre(e.target.value)} />

                    <br /><br />
                    <Label style={{  marginBottom: '10px', fontStyle: 'italic' }}>List as comma separated values</Label>
                    <TextField id='outlined-disabled' label='Course Anti-requisites' fullWidth={true} variant='outlined' style={{marginRight: '2%'}} value={courseAntirequisites} onChange={(e) => setAnti(e.target.value)} />
                  
                    <br /><br />
                    <TextField id='outlined-disabled' fullWidth={true} multiline={true} rows="5" label='Course Description' variant='outlined' style={{marginRight: '2%'}} value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                    
                    <br /> <br />
                    <Label style={{  marginBottom: '10px' }}> Select Faculty </Label>
                    <MajorSelect setMajor={setFaculty} major={faculty} />

                    <br />
                    <Button style={{float: 'right'}} variant='contained' color='primary' onClick={() => editCourse()}>Edit Course</Button>
                    <br />
                </Form>
            </Card>
        </>
    );
}

export default EditCourse;
