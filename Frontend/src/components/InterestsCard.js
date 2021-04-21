import React, {useState, useEffect, useCallback, useContext} from 'react';
import {AppContext} from '../AppContext';

import {Card, InputBase, Typography, CardActions, CardContent, Button,} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import FacultyDropdown from './FacultyDropdown';

function InterestsCard(props) {

    const [interests, setInterests] = useState('');
    const [interestsInput, setInterestsInput] = useState('');
    const [completedInput, setCompletedInput] = useState('')
    const [completedSubjects, setCompletedSubjects] = useState('');
    const [faculty, setFaculty] = useState('');

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

    return (
        <Card style={{marginBottom: '1%', padding: '1%'}}>
            <CardContent>
                <Typography> Input Your Interests (Comma Separated) </Typography>
                <br />

                <InputBase
                    placeholder='Your Interests...'
                    inputProps={{'aria-label': 'search'}}
                    value={interestsInput}
                    onChange={onInterestsChange}
                    fullWidth={true}
                />
                <br /><br />
                <Typography> Input Your Faculty </Typography>
                <FacultyDropdown setFaculty={setFaculty} faculty={faculty}/>

                <br /><br />
                <Typography> Input Your Completed Subject Codes (Comma Separated) </Typography>
                <br />

                <InputBase
                    placeholder='Completed Subject...'
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
