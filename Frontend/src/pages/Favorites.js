import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Typography, Container, Button, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Star from '@material-ui/icons/Star';
import {AppContext} from '../AppContext';
import Alert from '../components/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";

function Favorites() {  

    let history = useHistory();

    const data = useContext(AppContext);
    const [favorites, setFavorites] = useState([]);
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [loading, setLoading] = useState(true);

    const checkUserDetails = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
		await fetch(`http://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			let student_obj = await res.json();
            let favs = await student_obj.favorite_subjects;
			sessionStorage.setItem('favorites', favs);
			setFavorites(favs)
            setLoading(false)
		}).catch(() => {
            setShowAlert(true)
            setAlertMessage('Failed to load favorites')
            setLoading(false)
        })
	}, []);

    const toggleFavorite = async (code) => {

        let url = `http://${process.env.REACT_APP_SERVER}/api/student/favorites`
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
                .catch(() => {
                    setShowAlert(true)
                    setAlertMessage('Failed to set favorite')
            });
        } else {
            setShowAlert(true)
            setAlertMessage('Failed to set favorite')
        }
    }

    const learnMore = async (code) => {
        history.push(`/subject/?id=${code}`);
    }

    useEffect(() => {
        checkUserDetails()
    }, [checkUserDetails])

    const FakeFavoriteCard = () => {
        return (
            <Skeleton variant="rect" width={'auto'} height={'6vh'} style={{marginBottom: '10px'}} />
        );
    }

    const FavoriteCard = (subject) => {
        
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
                        <IconButton style={{marginTop: '-14px', marginLeft: "auto"}} onClick={() => toggleFavorite(code)}>
                                <Star style={{ color: '#ffc107'}} />  
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
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Favorite Subject List </Typography>
                <br />
                <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
                    <FakeFavoriteCard />
                    <FakeFavoriteCard />
                    <FakeFavoriteCard />
                </ul>
            </Container>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        )
    } else if (Object.keys(favorites).length < 1) {
        return (
            <>
            <Container maxWidth={false}>
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Favorite Subject List </Typography>
                <p> Use the search or recommendation function to add some favorite subjects... </p>
            </Container>
            </>
        )
    } else {
        return (
            <>
            <Container maxWidth={false}>
                <Typography variant='h5' style={{ paddingTop: '10px' }}> Favorite Subject List </Typography>
                <br />
                <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
                    {favorites.map((code, key) => (
                        <FavoriteCard code={code} key={key}/>
                    ))}
                </ul>
            </Container>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
            </>
        );    
    }
    
};

export default Favorites;
