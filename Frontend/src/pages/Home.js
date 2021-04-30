import React, {useState, useEffect, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import SearchHandler from '../lib/searchHandler.js';
import SubjectCard from '../components/SubjectCard';

import { AppContext } from '../AppContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Home() {

    const [name, setName] = useState('');


    // Get student details from database
    const fetchStudent = useCallback(async () => {
        let id = sessionStorage.getItem('user_id');
        if (id != null) {
            fetch(`http://localhost:8080/api/student/${id}`, {
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

