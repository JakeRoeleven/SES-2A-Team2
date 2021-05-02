import React, {useState, useEffect, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Home() {

    const [name, setName] = useState('');

    // Get student details from database
    const fetchStudent = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
        if (id != null) {
            fetch(`http://${process.env.REACT_APP_SERVER}/api/student/${id}`, {
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
            <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant='h4'> Welcome, {name} </Typography>
                    <Typography variant='h6'> Get Started With Course Recommender </Typography>

                    <ul>
                        <a href='/recommendations'><li>View Recommendations</li></a>
                        <a href='/search'><li>Search All Courses</li></a>
                        <a href='/account'><li>Update Your Account</li></a>
                        <a href='/favorites"'><li>View Your Favorite Courses</li></a>
                    </ul>
    
                </Grid>
            </Grid>
            </Container>
        </>
    ); 
}

export default Home;

