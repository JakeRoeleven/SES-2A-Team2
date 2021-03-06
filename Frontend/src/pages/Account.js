import React, {useState, useEffect, useCallback} from 'react';
import {Grid, Container, CssBaseline, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress} from '@material-ui/core';

import {Form} from 'semantic-ui-react';
import InterestSelect from '../components/InterestSelects';
import MajorSelect from '../components/MajorSelect';
import Alert from '../components/Alert';

function Account() {
    // UI related state
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // User Details
    const [userDetails, setUserDetails] = useState(null);
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [year, setYear] = useState(0);
    const [degree, setDegree] = useState('');
    const [faculty, setFaculty] = useState('');
    const [interests, setInterests] = useState([]);
    const [displayed_interests, setDisplayedInterests] = useState([]);


    // Convert User Data to State on load
    const convertDetails = async (details) => {
        if (details != null) {
            setUserDetails(details);

            // Name stuff
            let name = details['name'].split(' ');
            setFirstName(name[0]);
            setLastName(name[1]);

            // Year
            setYear(details['year']);

            // Degree
            setDegree(details['degree']);

            // Major
            setFaculty(details['major']);

            // Interests stuff - TODO: Find a better solution
            setInterests(details['interests']);
            let interests_obj_array = [];
            details['interests'].forEach((elem) => {
                interests_obj_array.push({value: elem, label: elem});
            });

            setDisplayedInterests(interests_obj_array);
        }
    };

    // Get student details from database
    const fetchStudent = useCallback(async () => {

        let id = sessionStorage.getItem('user_id');
        if (id != null) {
            fetch(`https://api.courses4you.club/api/student/${id}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(async (res) => {
                    let data = await res.json();
                    convertDetails(data);
                    setLoading(false);
                })
                .catch((e) => {
                    setAlertMessage('Error: We could not find your account details, please try again!');
                    setShowAlert(true);
                    setLoading(false);
                });
        }
    }, []);

    // Validate and Format Student Data
    const getFormattedStudentData = () => {
        let student = {};
        let id = sessionStorage.getItem('user_id');

        // Validation checks
        // TODO: SOmething nicer
        if (firstname.length < 1) {
            setAlertMessage('Warning: First Name cannot be empty!');
            setShowAlert(true);
            return false;
        }

        if (lastname.length < 1) {
            setAlertMessage('Warning: Last Name cannot be empty!');
            setShowAlert(true);
            return false;
        }

        if (degree.length < 1) {
            setAlertMessage('Warning: Degree cannot be empty!');
            setShowAlert(true);
            return false;
        }

        if (faculty.length < 1) {
            setAlertMessage('Warning: Please choose a faculty!');
            setShowAlert(true);
            return false;
        }

        if (interests.length < 1) {
            setAlertMessage('Warning: Please choose at least one interest!');
            setShowAlert(true);
            return false;
        }

        if (year === null) {
            setAlertMessage('Warning: Year cannot be empty!');
            setShowAlert(true);
            return false;
        }

        student['id'] = id;
        student['student_data'] = {};
        student['student_data']['name'] = firstname.concat(' ').concat(lastname);
        student['student_data']['degree'] = degree;
        student['student_data']['major'] = faculty;
        student['student_data']['year'] = year;
        student['student_data']['postgraduate'] = false;
        student['student_data']['interests'] = interests;

        return student;
    };

    // Post updated student details to database
    const submitAccountUpdate = () => {
        // Get the correctly formatted student data
        let student_data = getFormattedStudentData();
        if (student_data !== false) {
            // TODO: Handle this in backend
            let url = `https://api.courses4you.club/api/update-student`;
            if (userDetails == null) url = `https://api.courses4you.club/api/new-student`;

            // Send to database
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(student_data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        setAlertMessage('Success: Your account details were updated!');
                        setShowAlert(true);
                        fetchStudent();
                    } else {
                        setAlertMessage('Error: We failed to update your account!');
                        setShowAlert(true);
                    }
                })
                .catch((err) => {
                    setAlertMessage('Error: We failed to update your account!');
                    setShowAlert(true);
                });
        }
    };

    // Called when component mounts/updates
    useEffect(() => {
        if (userDetails == null) {
            fetchStudent();
        } else {
            setLoading(false);
        }
    }, [fetchStudent, setLoading, userDetails]);

    if (loading) {
        return (
            <>
                <CssBaseline />
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography variant='h5'> Edit Your Account </Typography>
                        </Grid>
                    </Grid>
                    <br /><br /><br /><br />
                    <div style={{ textAlign: 'center'}} >
                        <CircularProgress />
                    </div>
                </Container>
                <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        );
    } else {
        return (
            <>
                <CssBaseline />
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography variant='h5'> Edit Your Account </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Card style={{padding: '2%', overflow: 'visible', borderRadius: '10px'}} elevation={8}>
                        <Form>
                            <Typography
                                style={{
                                    fontSize: '1.2em',
                                    marginBottom: '15px',
                                }}
                                variant='h6'
                            >
                                Your Details
                            </Typography>
                            <TextField id='outlined-disabled' label='First Name' defaultValue={firstname} value={firstname} onChange={(event) => setFirstName(event.target.value)} variant='outlined' style={{marginRight: '2%'}} />

                            <TextField id='outlined-disabled' label='Last Name' defaultValue={lastname} value={lastname} onChange={(event) => setLastName(event.target.value)} variant='outlined' style={{marginRight: '2%'}} />

                            <FormControl variant='outlined' style={{minWidth: '120px'}}>
                                <InputLabel htmlFor='outlined-age-native-simple'>Degree Year</InputLabel>
                                <Select defaultValue={year} value={year} onChange={(e) => setYear(e.target.value)} label='Degree Year'>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                </Select>
                            </FormControl>

                            <br />
                            <br />

                            <TextField id='outlined-disabled' label='Degree' defaultValue={degree} value={degree} fullWidth='true' onChange={(event) => setDegree(event.target.value)} variant='outlined' />

                            <br />
                            <br />
                            <Typography
                                style={{
                                    fontSize: '1.2em',
                                    marginBottom: '10px',
                                }}
                                variant='h6'
                            >
                                Your Faculty
                            </Typography>
                            <MajorSelect setMajor={setFaculty} major={faculty} />
                            <br />
                            <Typography
                                style={{
                                    fontSize: '1.2em',
                                    marginBottom: '10px',
                                }}
                                variant='h6'
                            >
                                Your Interests
                            </Typography>
                            <InterestSelect displayed_interests={displayed_interests} setCurrentInterests={setInterests} setDisplayedInterests={setDisplayedInterests} />
                        </Form>
                        <br />
                        <br />
                        <Button style={{float: 'right'}} onClick={() => submitAccountUpdate()} color="primary" variant='contained'>
                            {' '}
                            Update Account{' '}
                        </Button>
                        <br />
                        <br />
                    </Card>
                </Container>

                <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        );
    }
}

export default Account;
