import React, { useState, useEffect } from 'react';

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';

function SubjectCard(props) {

    const [subject, setSubject] = useState({});
 
    return (
        <Card>
            <CardContent>
                
                <Typography color='textSecondary' gutterBottom> {props.subject.course_name} </Typography>

                <Typography variant='body2' component='p'> {props.subject.description } </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default SubjectCard;
