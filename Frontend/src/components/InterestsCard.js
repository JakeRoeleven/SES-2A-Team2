import React, {useEffect, useState, useCallback } from 'react';
import {Card, InputBase, Typography, CardActions, CardContent, Button,} from '@material-ui/core';
import InterestSelect from '../components/InterestSelects';
import firebase from './../firebase';

function InterestsCard(props) {

    const [interests, setInterests] = useState([]);
    const [displayedInterests, setDisplayedInterests] = useState([]);

    const [interestsInput, setInterestsInput] = useState('');
    const [completedInput, setCompletedInput] = useState('')
    const [completedSubjects, setCompletedSubjects] = useState('');
    const [faculty, setFaculty] = useState('');

    const [firebaseID, setFirebaseID] = useState(null);
    const [userDetails, setUserDetails] = useState(null)

    const onInterestsChange = (event) => {
        setInterestsInput(event.target.value)
        let temp_interests = event.target.value.split(",");
        let interests_array = [];
        temp_interests.forEach(elem => {
            console.log(elem)
            interests_array.push(elem.replace(/\W/g, ''))
        })
        setInterests(interests_array);
    };

    const onCompletedChange = (event) => {
        setCompletedInput(event.target.value)
        let temp_interests = event.target.value.split(",");
        let interests_array = [];
        temp_interests.forEach(elem => {
            console.log(elem)
            interests_array.push(elem.replace(/\W/g, ''))
        })
        setCompletedSubjects(interests_array);
    };

    const getStudentObj = () => {
        let student = {
            interests: interests,
            faculty: faculty,
            courses_completed: completedSubjects
        }
        return(student)
    }

    const setInterestsDropdownList = (interests_array) => {
        let interests_obj_array = [];
        interests_array.forEach(elem => {
            interests_obj_array.push({value: elem, label: elem});
        })
        setDisplayedInterests(interests_obj_array)
    }

    const fetchStudent = async () => {
        if (firebaseID) {
            fetch(`http://localhost:8080/api/student/${firebaseID}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (res) => {
                let data = await res.json();
                setUserDetails(data);
                console.log(data.interests)
                setInterestsDropdownList(data.interests)
            }).catch((err) => {
                console.log(err);
            });
        }
	};

    useEffect(() => {
        let firebaseDetails = firebase.getCurrentUser()
        if (firebaseDetails) setFirebaseID(firebaseDetails.l)
        fetchStudent();
    }, [fetchStudent, firebase, setFirebaseID]);

    return (
        <Card style={{marginBottom: '1%', padding: '1%'}}>
            <CardContent>
                <Typography> Input Your Interests </Typography>
                <br />

                <InterestSelect 
						displayed_interests={displayedInterests} 
						setCurrentInterests={setInterests} 
						setDisplayedInterests={setDisplayedInterests} />

                <br />
                {/* <Typography> Input Your Faculty </Typography>
                <FacultyDropdown setFaculty={setFaculty} faculty={faculty}/> */}

                <Typography> Input Your Completed Subject Codes (Comma Separated) </Typography>
                <br />

                <InputBase
                    placeholder='Completed Subjects...'
                    inputProps={{'aria-label': 'search'}}
                    value={completedInput}
                    onChange={onCompletedChange}
                    fullWidth={true}
                />
            </CardContent>
            <CardActions style={{float: 'right'}}>
                <Button color='primary' size='small' onClick={() => props.findRecommendations(getStudentObj())}> Find Recommendations </Button>
            </CardActions>
        </Card>
    );
}

export default InterestsCard;
