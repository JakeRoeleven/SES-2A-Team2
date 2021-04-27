import React, {useState, useEffect} from 'react';
import {
    Grid,
    Container,
    CssBaseline,
    Typography,
    Card,
    TextField, 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import {Form} from 'semantic-ui-react';
import Firebase from './../firebase';

import InterestSelect from '../components/InterestSelects';
import MajorSelect from '../components/MajorSelect';

function Account() {

    const [hasDetails, setHasDetails] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [lastname, setLastName] = useState('Last Name');
    const [firstname, setFirstName] = useState('Last Name');
    const [year, setYear] = useState(0);
    const [degree, setDegree] = useState('Your Degree');
    const [faculty, setFaculty] = useState('Your Faculty');
    const [interests, setInterests] = useState([]);
    const [displayed_interests, setDisplayedInterests] = useState([]);
    const [coursesCompleted, setCoursesCompleted] = useState('Last Name');

    const setDetailsFromFirebase = async (details) => {
        if (details != null) {
            setHasDetails(true)
            setUserDetails(details)
            
            // Name stuff
            let name = details['name'].split(' ');
            setFirstName(name[0])
            setLastName(name[1])

            // Year
            setYear(details['year'])

            // Degree
            setDegree(details['degree'])

            // Major
            setFaculty(details['major'])

            // Interests stuff - TODO: Find a better solution
            setInterests(details['interests'])
            let interests_obj_array = [];
            details['interests'].forEach(elem => {
                interests_obj_array.push({value: elem, label: elem});
            })
            setDisplayedInterests(interests_obj_array)
        }
    }

    const getStudentData = () => {

		let student = {}

		// Push id from firebase
		student['id'] = userDetails._id;

		student["student_data"] = {}
		student["student_data"]['name'] = firstname.concat(" ").concat(lastname)
		
        //TODO: Need degree
        student["student_data"]['degree'] = degree;
        student["student_data"]['major'] = faculty;
		student["student_data"]['year'] = year;
		student["student_data"]['postgraduate'] = false;
		student["student_data"]['interests'] = interests;

		return student;
	}

    // Post student details to database
    const submitAccountUpdate = () => {
        fetch('http://localhost:8080/api/update-student', {
        	method: 'POST',
        	body: JSON.stringify(getStudentData()),
        	headers: {
        		'Content-Type': 'application/json'
        	}
        })
        	.then(async (res) => {
        		if (res.status === 200) {
                    alert("Details updated")
        		} else {
        			const error = JSON.parse(await res.json());
					alert(error)
        		}
        	})
        	.catch(err => {
        		alert(err)
        });
    }

    // Get student details from database
    const fetchStudent = async () => {
        
        let firebaseDetails = null

        firebaseDetails = await Firebase.getCurrentUser();

        if (firebaseDetails !== null) {
            fetch(`http://localhost:8080/api/student/${firebaseDetails.l}`, {
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
                    setDetailsFromFirebase(data);
                })
                .catch((err) => {
                    console.log(err);
            });
        } else {
            setHasDetails(!hasDetails)
        }

    };

    const test = () => {
    }

    useEffect(() => {
        // TODO: Find something less hacky
        if(userDetails == null) fetchStudent();
    }, [fetchStudent]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant='h5'>
                            {' '}
                            Edit Your Account{' '}
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Card style={{ padding: '2%', overflow: 'visible'}}>
                    <Form>

                        <TextField
                            id="outlined-disabled"
                            label="First Name"
                            defaultValue={firstname}
                            value={firstname}
                            onChange={(event) => setFirstName(event.target.value)}
                            variant="outlined"
                            style={{ marginRight: '2%' }}
                        />

                        <TextField
                            id="outlined-disabled"
                            label="Last Name"
                            defaultValue={lastname}
                            value={lastname}
                            onChange={(event) => setLastName(event.target.value)}
                            variant="outlined"
                            style={{ marginRight: '2%' }}
                        />

                        <FormControl variant="outlined" style={{ minWidth: '120px' }}>
                            <InputLabel htmlFor="outlined-age-native-simple">Degree Year</InputLabel>
                            <Select defaultValue={year} value={year} onChange={(e) => setYear(e.target.value)} label="Degree Year">
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>   
                            </Select>
                        </FormControl>

                        <br /><br />

                        <TextField
                            id="outlined-disabled"
                            label="Degree"
                            defaultValue={degree}
                            value={degree}
                            fullWidth="true"
                            onChange={(event) => setDegree(event.target.value)}
                            variant="outlined"
                        />

                        <br /><br />
                        <MajorSelect setMajor={setFaculty} major={"Engineering"}/>
                        <br />
                        <InterestSelect 
                            displayed_interests={displayed_interests} 
                            setCurrentInterests={test()} 
                            setDisplayedInterests={test()} />
                    </Form>
                    <br /><br />
                    <Button onClick={() => submitAccountUpdate()}> Update Account </Button>
                </Card>
            </Container>
        </>
    );
}

export default Account;
