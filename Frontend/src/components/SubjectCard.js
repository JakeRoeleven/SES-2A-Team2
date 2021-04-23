import React, { useState, useEffect } from 'react';

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    IconButton
} from '@material-ui/core';

import StarOutline from '@material-ui/icons/StarOutline';
import Star from '@material-ui/icons/Star';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';

function SubjectCard(props) {

    const [title, setTitle] = useState('');
    const [faculty, setFaculty] = useState('');
    const [displayParagraph, setDisplayParagraph] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [complete, setComplete] = useState(false);

    console.log(props)

    useEffect(() => {
        setTitle(props.subject._id + " - " + props.subject.course_name);
        setFaculty("Faculty of  " + props.subject.faculty)
        setDisplayParagraph(props.subject.description.substring(0, 300).trim())
    }, [setTitle, setFaculty, setDisplayParagraph, props]);

    const displayFullDescription = () => {
        setDisplayParagraph(props.subject.description)
    }

    const toggleFavorite = () => {
        setFavorite(!favorite)
    }

    const toggleComplete = () => {
        setComplete(!complete)
    }

    const FavoriteStar = () => {   
        if (favorite) {
            return <Star style={{ color: '#ffc107' }}/>
        } else {
            return  <StarOutline/>
        }
    }

    const CompleteCircle = () => {   
        if (complete) {
            return <CheckCircle style={{ color: '#43a047' }}/>
        } else {
            return  <CheckCircleOutline/>
        }
    }

    return (
        <Card style={{marginBottom: "1%"}}>
           
           <CardContent style={{display: "flex", paddingBottom: '0px'}}>   
               
                <Typography color='textPrimary' style={{padding: '12px', paddingLeft: '0px'}}> {title} </Typography> 

                <IconButton aria-label="favorite" style={{marginLeft: "auto"}} onClick={() => toggleComplete()}>
                    <CompleteCircle/>
                </IconButton>
                
                <IconButton aria-label="favorite" onClick={() => toggleFavorite()}>
                    <FavoriteStar/>
                </IconButton>

            </CardContent>

            <CardContent style={{paddingLeft: '16px', paddingTop: '0px'}}>  
                <Typography variant="caption"> {faculty} </Typography>
                <Typography paragraph style={{ paddingTop: '10px'}}> {displayParagraph} <span onClick={() => displayFullDescription()} style={{ fontSize: '0.6em'}}>Read More...</span> </Typography>
            </CardContent>
            
            <CardActions style={{paddingRight: '28px', paddingBottom: '12px'}}>
                <Button  style={{ marginLeft: "auto"}} target="_blank" color="primary" size='small'  href={props.subject.link}>Visit Handbook</Button>
            </CardActions>
        
        </Card>
    );
}

export default SubjectCard;
