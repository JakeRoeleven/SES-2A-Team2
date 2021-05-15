import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Typography, Container, Button, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {AppContext} from '../AppContext';
import Alert from '../components/Alert';
import { useHistory } from "react-router-dom";
import CheckCircle from '@material-ui/icons/CheckCircle';
import Skeleton from '@material-ui/lab/Skeleton';

function Completed() {  

    let history = useHistory();
    const data = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const checkUserDetails = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
		await fetch(`https://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			let student_obj = await res.json();
            let complete = await student_obj.courses_completed;
			sessionStorage.setItem('complete', complete);
			setCompleted(complete)
            setLoading(false)
		}).catch(() => {
            setShowAlert(true)
            setAlertMessage('Failed to load completed courses')
            setLoading(false)
        })
	}, []);

    const toggleComplete = async (code) => {

        let url = `https://${process.env.REACT_APP_SERVER}/api/student/completed`
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
                        let complete = await res.json()
                        setCompleted(await complete)
                        sessionStorage.setItem('complete', await complete)
                        if (complete.includes(code)) setAlertMessage('Set '+ code + ' as course complete')
                        else  setAlertMessage('Removed '+ code + ' as course complete')
                        setShowAlert(true)
                    } else {
                        setShowAlert(true)
                        setAlertMessage('Failed to set course complete')
                    }
                })
                .catch(() => {
                    setShowAlert(true)
                    setAlertMessage('Failed to set course complete')
            });
        } else {
            setShowAlert(true)
            setAlertMessage('Failed to set course complete')
        }
    }

    const learnMore = async (code) => {
        history.push(`/subject/?id=${code}`);
    }

    useEffect(() => {
        checkUserDetails()
    }, [checkUserDetails])

    const FakeCompletedCard = () => {
        return (
            <Skeleton variant="rect" width={'auto'} height={'6vh'} style={{marginBottom: '10px'}} />
        );
    }

    const CompletedCard = (subject) => {
        
        let code = subject['code'];
        let subject_obj = {}
        data.forEach(elem => {
            if (code === elem._id) {
                subject_obj = elem
            }
        })

        return (
            <li>
                <Paper elevation={3} style={{marginBottom: '10px', padding: '1.5%'}}> 
                    {code + " " + subject_obj["course_name"]}
                    <div style={{float: 'right'}}>
                        <Button style={{marginTop: '-14px', marginRight: '10px'}} onClick={() => learnMore(code)}> Learn More </Button>
                        <IconButton style={{marginTop: '-14px', marginLeft: "auto"}} onClick={() => toggleComplete(code)}>
                            <CheckCircle style={{ color: '#43a047' }}/> 
                        </IconButton>
                    </div>
                </Paper>
            </li>
        );
    }
   
    if (loading) {
        return (
            <>
            <Container maxWidth={false}>
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Completed Subject List </Typography>
                <br />
                <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
                    <FakeCompletedCard />
                    <FakeCompletedCard />
                    <FakeCompletedCard />
                </ul>
            </Container>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        )
    } else if (Object.keys(completed).length < 1) {
        return (
            <>
            <Container maxWidth={false}>
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Completed Subject List </Typography>
                <p> Use the search or recommendation function to add some completed subjects... </p>
            </Container>
            </>
        )
    } else {
        return (
            <>
            <Container maxWidth={false}>
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Completed Subject List </Typography>
                <br />
                <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
                    {completed.map((code, key) => (
                        <CompletedCard code={code} key={key}/>
                    ))}
                </ul>
            </Container>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        );    
    }
    
};

export default Completed;
