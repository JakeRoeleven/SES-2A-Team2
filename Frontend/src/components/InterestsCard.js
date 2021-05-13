import React, {useCallback, useEffect, useState} from 'react';
import {Card, Typography, CardContent, Button, Container, CircularProgress} from '@material-ui/core';
import InterestSelect from '../components/InterestSelects';
import MajorSelect from '../components/MajorSelect';
import CoursesCompleted from '../components/CompletedCourses';

function InterestsCard(props) {

    const [fetchedStudent, setFetchedStudent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [interests, setInterests] = useState([]);
    const [displayedInterests, setDisplayedInterests] = useState([]);
    const [completedSubjects, setCompletedSubjects] = useState([]);
    const [faculty, setFaculty] = useState('');

    const getStudentObj = () => {
        let student = {
            interests: interests,
            faculty: faculty,
            courses_completed: completedSubjects,
        };
        return student;
    };

    const setInterestsDropdownList = (interests_array) => {
        setLoading(false);
        let interests_obj_array = [];
        interests_array.forEach((elem) => {
            interests_obj_array.push({value: elem, label: elem});
        });
        setDisplayedInterests(interests_obj_array);
    };

    const fetchStudent = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
        fetch(`http://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
            crossDomain: true,
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(async (res) => {
            let data = await res.json();
            setFetchedStudent(data);
            setInterests(data.interests);
            setCompletedSubjects(data.courses_completed);
            setInterestsDropdownList(data.interests);
            setFaculty(data.major);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if (props.completed !== false) {
            setCompletedSubjects(props.completed)
        } 
        if (!fetchedStudent) fetchStudent();
    }, [fetchStudent, fetchedStudent, setCompletedSubjects, completedSubjects, props]);

    if (loading) {
        return (
            <>
                <Container style={{ textAlignLast: 'center' , paddingTop: '100px'}} maxWidth={false}>
                    <CircularProgress />
                </Container>
            </>
        );
    } else {
        return (
            <Card elevation={8} style={{borderRadius: '25px', marginBottom: '1%', padding: '1%', overflow: 'visible'}}>
                <CardContent>
                    <Typography style={{marginBottom: '0.5%'}}> Your Interests </Typography>

                    <InterestSelect displayed_interests={displayedInterests} setCurrentInterests={setInterests} setDisplayedInterests={setDisplayedInterests} />

                    <br />

                    <Typography style={{marginBottom: '0.5%'}}> Your Faculty </Typography>
                    <MajorSelect setMajor={setFaculty} major={faculty} />
                    <br />

                    <Typography style={{marginBottom: '0.5%'}}> Your Completed Courses </Typography>
                    <CoursesCompleted courses={completedSubjects} student={fetchedStudent} limit={5} />

                    <Button variant='contained' style={{float: 'right'}} color='primary' onClick={() => props.findRecommendations(getStudentObj())}>
                        Find Recommendations
                    </Button>
                    <br />
                </CardContent>
            </Card>
        );
    }
}

export default InterestsCard;
