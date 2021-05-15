import React, {useState, useEffect, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Transform from '@material-ui/icons/Transform';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Star from '@material-ui/icons/Star';

import { useHistory } from "react-router-dom";

function Home() {

    // Hacky way to override overflow
    document.body.style.overflow = 'auto';

    let history = useHistory();
    const [name, setName] = useState('');

    // Get student details from database
    const fetchStudent = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
        if (id != null) {
            fetch(`https://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
                crossDomain: true,
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(async (res) => {
                    let data = await res.json();
                    // Name stuff
                    let name = data['name'].split(' ');
                    setName(name[0]);
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }, []);

    // Called when component mounts/updates
    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: '-16px'}}>
                    <Typography variant='h4'> Welcome, {name} </Typography>
                    <Typography variant='h6'> Get Started With Course Recommender </Typography>
                    <Grid className={'homeGrid'} container spacing={2}>
                        
                        <Grid item xs={2}>
                            <Paper onClick={() => history.push('/recommendations')} className={'homeCard'} elevation={3}>
                                <Transform/><br /><br /><br />
                                View Recommendations
                            </Paper>
                        </Grid>

                        <Grid item xs={2}>
                            <Paper onClick={() => history.push('/search')} className={'homeCard'} elevation={3}>
                                <SearchIcon/><br /><br /><br />
                                Search Courses
                            </Paper>
                        </Grid>

                        <Grid item xs={2}>
                            <Paper onClick={() => history.push('/account')} className={'homeCard'}  elevation={3}>
                                <AccountCircle/><br /><br /><br />
                                Update Account
                            </Paper>
                        </Grid>

                        <Grid item xs={2}>
                            <Paper onClick={() => history.push('/favorites')} className={'homeCard'}  elevation={3}>
                                <Star/><br /><br /><br />
                                View Favorites
                            </Paper>
                        </Grid>

                        <Grid item xs={2}>
                            <Paper onClick={() => history.push('/completed')} className={'homeCard'}  elevation={3}>
                                <CheckCircleOutline/><br /><br /><br />
                                View Completed Courses
                            </Paper>
                        </Grid>    
                    </Grid>
            </Container>
        </>
    ); 
}

export default Home;

