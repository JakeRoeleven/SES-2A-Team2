import React, { useState, useEffect } from 'react';

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    IconButton,
    Chip
} from '@material-ui/core';

import StarOutline from '@material-ui/icons/StarOutline';
import Star from '@material-ui/icons/Star';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';

import Alert from '../components/Alert';

function SubjectCard(props) {

    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('#');
    const [faculty, setFaculty] = useState('');
    const [displayParagraph, setDisplayParagraph] = useState('');
    const [showFullCard, setShowFullCard] = useState(false);
   
    const [favorite, setFavorite] = useState(false);
    const [complete, setComplete] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [completed, setCompleted] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {

        let favorites = sessionStorage.getItem('favorites');
        if (favorites) setFavorites(favorites)

        let completed = sessionStorage.getItem('complete');
        if (completed) setCompleted(completed)

        if (props.subjects && props.subject.link) setLink(props.subject.link);
        setCode(props.subject._id)
        setTitle(props.subject._id + " - " + props.subject.course_name);
        setFaculty("Faculty of  " + props.subject.faculty)

        let des = props.subject.description.substring(0, 500).trim();
        let words = des.split(" ");
        let last = words[words.length - 1]
        des = des.replace(last, "");
        des = des.trim();
        setDisplayParagraph(des + '...');

    }, [setTitle, setFaculty, setDisplayParagraph, props]);

    const toggleFavorite = async (code) => {

        let url = `https://api.courses4you.club/api/student/favorites`
        let id = sessionStorage.getItem('user_id');
    
        if (id && code) {
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    "subject_code": code ,
                    "id": id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async (res) => {
                    if (res.status === 200) {


                        setFavorite(!favorite)
                        let fav_res = await res.json()
                        setFavorites(await fav_res)
                        sessionStorage.setItem('favorites', await fav_res)

                        if (fav_res.includes(code)) setAlertMessage('Set '+ code + ' as favorite');
                        else  setAlertMessage('Removed '+ code + ' as favorite');
                        setShowAlert(true)


                    } else {
                        setShowAlert(true)
                        setAlertMessage('Failed to set favorite')
                    }
                })
                .catch(err => {
                    setShowAlert(true)
                    setAlertMessage('Failed to set favorite')
            });
        } else {
            setShowAlert(true)
            setAlertMessage('Failed to set favorite')
        }
    }

    const toggleComplete = async (code) => {

        let url = `https://api.courses4you.club/api/student/completed`
        let id = sessionStorage.getItem('user_id');
    
        if (id && code) {
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    "subject_code": code ,
                    "id": id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        //props.coursesUpdated()
                        setComplete(!complete)
                        let courses = await res.json()
                        if (courses.includes(code)) setAlertMessage('Added '+ code + ' to courses complete')
                        else setAlertMessage('Removed '+ code + ' to courses complete')
                        setShowAlert(true)

                        if (props.callback) {
                            setTimeout(() => {
                                props.callback(courses)
                            }, 1000)
                        }

                    } else {
                        setShowAlert(true)
                        setAlertMessage('Failed to set course complete')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setShowAlert(true)
                    setAlertMessage('Failed to set course complete')
            });
        } else {
            setShowAlert(true)
            setAlertMessage('Failed to set course complete')
        }

    }

    const FavoriteStar = () => {   
        if (favorites.includes(code)) {
            return <Star style={{ color: '#ffc107' }}/>
        } else {
            return  <StarOutline/>
        }
    }

    const CompleteCircle = () => {   
        if (completed.includes(code) || complete) {
            return <CheckCircle style={{ color: '#43a047' }}/>
        } else {
            return  <CheckCircleOutline/>
        }
    }

    const Content = () => {
        if (showFullCard) {
            return   (
                <CardContent style={{paddingLeft: '16px', paddingTop: '0px'}}>  
                    <Chip label={faculty} /> <Chip variant="outlined" label={props.subject.credit_points} />
                    <Typography paragraph style={{ paddingTop: '10px'}}> {props.subject.description} </Typography>
                    <p> Pre-requisites: 
                    {props.subject['pre-requisites'].map((req) => (
                        <span> {req} </span>
                    ))}
                    </p>
                    <p> Anti-requisites: 
                    {props.subject['anti-requisites'].map((req) => (
                        <span> {req} </span>
                    ))}
                    </p>
                </CardContent>
            )      
        } else {
            return (
                <CardContent style={{paddingLeft: '16px', paddingTop: '0px'}}>  
                    <Chip label={faculty} />
                    <Typography paragraph style={{ paddingTop: '10px'}}> {displayParagraph} </Typography>
                </CardContent>
            ) 
        }
    }

    const ShowMore = () => {
        if (showFullCard) {
            return <Button variant="contained" target="_blank" color="primary" size='small' onClick={()=> setShowFullCard(false)} >Show Less</Button>
        } else {
            return <Button variant="contained" target="_blank" color="primary" size='small' onClick={()=> setShowFullCard(true)} >Learn More</Button>
        }
    }

    return (
        <Card elevation={4} style={{marginBottom: "1%", overflow: 'visible'}}>
           
           <CardContent style={{display: "flex", paddingBottom: '0px'}}>   
               
                <Typography color='textPrimary' style={{padding: '12px', paddingLeft: '0px'}}> {title} </Typography> 

                <IconButton aria-label="favorite" style={{marginLeft: "auto"}} onClick={() => toggleComplete(props.subject._id)}>
                    <CompleteCircle/>
                </IconButton>
                
                <IconButton aria-label="favorite" onClick={() => toggleFavorite(props.subject._id)}>
                    <FavoriteStar/>
                </IconButton>

            </CardContent>

            <Content />
            
            <CardActions style={{paddingRight: '28px', paddingBottom: '12px'}}>
                <Button variant="contained" style={{ marginLeft: "auto"}} target="_blank" size='small'  href={link}>Visit Handbook</Button>
                <ShowMore />
            </CardActions>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
        </Card>
    );
}

export default SubjectCard;
