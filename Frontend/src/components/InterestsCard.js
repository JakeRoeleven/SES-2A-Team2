import React, {useState, useEffect, useCallback, useContext} from 'react';
import {AppContext} from '../AppContext';

import {Card, InputBase, Typography, CardActions, CardContent, Button,} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

function InterestsCard(props) {

    const [interests, setInterests] = useState('');
    const [interestsInput, setInterestsInput] = useState('');

    const onChange = (event) => {
        setInterestsInput(event.target.value)
        let temp_interests = event.target.value.split(",");
        let interests_array = [];
        temp_interests.forEach(elem => {
            console.log(elem)
            interests_array.push(elem.replace(/\W/g, ''))
        })
        setInterests(interests_array);
    };

    return (
        <Card style={{marginBottom: '1%', padding: '1%'}}>
            <CardContent>
                <Typography> Input Your Interests (Comma Separated) </Typography>
                <br />

                <InputBase
                    placeholder='Your Interests...'
                    inputProps={{'aria-label': 'search'}}
                    value={interestsInput}
                    onChange={onChange}
                />
            </CardContent>
            <CardActions style={{float: 'right'}}>
                <Button color='primary' size='small' onClick={() => props.findRecommendations(interests)}> Find Recommendations </Button>
            </CardActions>
        </Card>
    );
}

export default InterestsCard;
