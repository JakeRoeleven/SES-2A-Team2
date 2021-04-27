import React, { useEffect, useState } from 'react';
import {Card, InputBase, Typography, CardContent, Button, Container, CircularProgress} from '@material-ui/core';
import InterestSelect from '../components/InterestSelects';
import MajorSelect from '../components/MajorSelect';
import CoursesCompleted from '../components/CompletedCourses';

function InterestsCard(props) {

    const [fetchedStudent, setFetchedStudent] = useState(false)
    const [loading, setLoading] = useState(true);
    const [interests, setInterests] = useState([]);
    const [displayedInterests, setDisplayedInterests] = useState([]);
    const [completedSubjects, setCompletedSubjects] = useState([]);
    const [faculty, setFaculty] = useState('');

    const getStudentObj = () => {
        let student = {
            interests: interests,
            faculty: faculty,
            courses_completed: completedSubjects
        }
        return(student)
    }

    const setInterestsDropdownList = (interests_array) => {
        setLoading(false)
        let interests_obj_array = [];
        interests_array.forEach(elem => {
            interests_obj_array.push({value: elem, label: elem});
        })
        setDisplayedInterests(interests_obj_array)
    }

    const fetchStudent = async () => {
        let id = sessionStorage.getItem('user_id');
        fetch(`http://localhost:8080/api/student/${id}`, {
            crossDomain: true,
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(async (res) => {
                let data = await res.json();
                debugger;
                setFetchedStudent(data)
                setInterests(data.interests)
                setCompletedSubjects(data.courses_completed)
                setInterestsDropdownList(data.interests)
                setFaculty(data.major)
        }).catch((err) => {
                console.log(err);
        });
	};

    useEffect(() => {
       if (!fetchedStudent) fetchStudent();
    }, []);

    if (loading) {
        return (
            <>
            <Container maxWidth={false}>
                <Card style={{ padding: '1%', overflow: 'visible', textAlign: 'center'}}>
                    <CircularProgress />
                </Card>
            </Container>
            </>
        )
    } else {
        return (
            <Card style={{marginBottom: '1%', padding: '1%', overflow: 'visible'}}>
                <CardContent>
                    <Typography style={{marginBottom: '0.5%'}}> Your Interests </Typography>
    
                    <InterestSelect 
                        displayed_interests={displayedInterests} 
                        setCurrentInterests={setInterests} 
                        setDisplayedInterests={setDisplayedInterests} />
    
                    <br />

                    <Typography  style={{marginBottom: '0.5%'}}> Your Faculty </Typography>
                    <MajorSelect setMajor={setFaculty} major={faculty}/>
                    <br />

                    <Typography style={{marginBottom: '0.5%'}}> Your Completed Courses </Typography>
                    <CoursesCompleted courses={completedSubjects} student={fetchedStudent}/>

                    <Button style={{float: 'right'}} color='primary' size='small' onClick={() => props.findRecommendations(getStudentObj())}> Find Recommendations </Button>
                </CardContent>
            </Card>
        );
    }
  
}

export default InterestsCard;
