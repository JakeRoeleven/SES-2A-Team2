import React from 'react';

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';

function SubjectCard(props) {
    return (
        <Card style={{marginBottom: "1%"}}>
            <CardContent>   
                <Typography color='textPrimary' gutterBottom> {props.subject.course_name} </Typography>
                <Typography variant='body2' component='p'> {props.subject.description} </Typography>
            </CardContent>
            <CardActions>
                <Button target="_blank" color="primary" size='small'  href={props.subject.link}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default SubjectCard;
