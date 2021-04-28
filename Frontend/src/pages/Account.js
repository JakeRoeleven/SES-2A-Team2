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
    MenuItem,
    CircularProgress
} from '@material-ui/core';
import {Form} from 'semantic-ui-react';

import InterestSelect from '../components/InterestSelects';
import MajorSelect from '../components/MajorSelect';
import CoursesCompleted from '../components/CompletedCourses';

function Account() {

    const [loading, setLoading] = useState(true);
    
    // User Details
    const [userDetails, setUserDetails] = useState(null);
    const [lastname, setLastName] = useState('Last Name');
    const [firstname, setFirstName] = useState('Last Name');
    const [year, setYear] = useState(0);
    const [degree, setDegree] = useState('Your Degree');
    const [faculty, setFaculty] = useState('Your Faculty');
    const [interests, setInterests] = useState([]);
    const [displayed_interests, setDisplayedInterests] = useState([]);
    const [coursesCompleted, setCoursesCompleted] = useState([]);

    const setDetailsFromFirebase = async (details) => {
        if (details != null) {
            setUserDetails(details)

            // Courses Completed
            setCoursesCompleted(details['courses_completed']);
            
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
            setDisplayedInterests(interests_obj_array);

        }
    }

    const getStudentData = () => {

		let student = {}

		// Push id from firebase
        let id = sessionStorage.getItem('user_id');

		student['id'] = id

		student["student_data"] = {}
		student["student_data"]['name'] = firstname.concat(" ").concat(lastname)
		
        //TODO: Need degrees
        student["student_data"]['degree'] = degree;
        student["student_data"]['major'] = faculty;
		student["student_data"]['year'] = year;
		student["student_data"]['postgraduate'] = false;
		student["student_data"]['interests'] = interests;

		return student;
	}

    // Post student details to database
    const submitAccountUpdate = () => {

        let student_data = getStudentData()

        let url = 'http://localhost:8080/api/update-student'
        if (userDetails == null) url = 'http://localhost:8080/api/new-student'

        fetch(url, {
        	method: 'POST',
        	body: JSON.stringify(student_data),
        	headers: {
        		'Content-Type': 'application/json'
        	}
        })
        	.then(async (res) => {
        		if (res.status === 200) {
                    alert("Details updated")
                    fetchStudent()
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
        debugger;
        let id = sessionStorage.getItem('user_id');
        if (id != null) {
            fetch(`http://localhost:8080/api/student/${id}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(async (res) => {
                    debugger;
                    let data = await res.json();
                    setDetailsFromFirebase(data);
                    setLoading(false);
                })
                .catch((err) => {
                    debugger;
                    console.log(err);
                    setLoading(false);
            });
        }

    };

    useEffect(() => {
        if(userDetails == null) {
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
                        <Typography variant='h5'>
                            {' '}
                            Edit Your Account{' '}
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Card style={{ padding: '2%', overflow: 'visible', textAlign: 'center'}}>
                    <CircularProgress />
                </Card>
            </Container>
            </>
        )
    } else {
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
                            <Typography style={{ fontSize: '1.2em', marginBottom: '10px' }}  variant='h6'>Your Faculty</Typography>
                            <MajorSelect setMajor={setFaculty} major={faculty}/>
                            <br />
                            <Typography style={{ fontSize: '1.2em', marginBottom: '10px' }}  variant='h6'>Your Interests</Typography>
                            <InterestSelect 
                                displayed_interests={displayed_interests} 
                                setCurrentInterests={setInterests} 
                                setDisplayedInterests={setDisplayedInterests} />
                        </Form>
                        <br /><br />
                        <Button style={{ float: 'right' }} onClick={() => submitAccountUpdate()}> Update Account </Button>
                        <br /><br />
                        <Typography style={{ fontSize: '1.2em' }}  variant='h6'>Courses You Have Completed</Typography>
                        <br />
                        <CoursesCompleted courses={coursesCompleted} student={userDetails}/>
                    </Card>
                </Container>
            </>
        );
    }

}

export default Account;
