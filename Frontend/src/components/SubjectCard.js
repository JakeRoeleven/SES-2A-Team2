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

    const toggleComplete = async (id) => {
        
        setComplete(!complete);
        let old_student = {};

        let student_id = sessionStorage.getItem('user_id');
        await fetch(`http://localhost:8080/api/student/${student_id}`, {
            crossDomain: true,
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(async (res) => {
            old_student = await res.json();
        }).catch((err) => {
                console.log(err);
        });

        let completed = old_student['courses_completed'];
        completed.push(id)

        			// Make the student object
        let student = {}
        student['id'] = old_student._id;
        student["student_data"] = {}
        student["student_data"]['name'] = old_student.name;
        student["student_data"]['degree'] = old_student.degree;
        student["student_data"]['major'] = old_student.major;
        student["student_data"]['year'] = old_student.year;
        student["student_data"]['postgraduate'] = old_student.postgraduate;
        student["student_data"]['interests'] = old_student.interests;
        student["student_data"]['courses_completed'] = completed;

        fetch('http://localhost:8080/api/update-student', {
            method: 'POST',
            body: JSON.stringify(student),
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
        <Card style={{marginBottom: "1%", overflow: 'visible'}}>
           
           <CardContent style={{display: "flex", paddingBottom: '0px'}}>   
               
                <Typography color='textPrimary' style={{padding: '12px', paddingLeft: '0px'}}> {title} </Typography> 

                <IconButton aria-label="favorite" style={{marginLeft: "auto"}} onClick={() => toggleComplete(props.subject._id)}>
                    <CompleteCircle/>
                </IconButton>
                
                <IconButton aria-label="favorite" onClick={() => toggleFavorite(props.subject._id)}>
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
