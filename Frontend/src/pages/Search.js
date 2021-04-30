import React, {useState, useEffect, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SearchHandler from '../lib/searchHandler.js';
import SubjectCard from '../components/SubjectCard';
import CircularProgress from  '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Alert from '../components/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 32,
        margin: 4,
    },
}));

function Search() {

    const data = useContext(AppContext);
    const classes = useStyles();

    const [subjects, setSubjects] = useState({});
    const [results, setResults] = useState({});
    const [searchValue, setSearchValue] = useState('');

    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // ALert related state
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const searchSubjects = async () => {

        if (searchValue.length > 1) {
            setLoading(true)
            setError(false)
            setResults({});
            let searchHandler = new SearchHandler(subjects);
            let searchResults = await searchHandler.searchAllSubjects(searchValue);
            
            setLoading(false)
            if (Object.keys(searchResults).length < 1) {
                setError(true)
                setErrorMessage('No results found for: ' + searchValue)
            } else {
                setResults(searchResults);
            }
            setResults(searchResults);

        } else {
            setResults({});
            setError(false)
            setAlertMessage('Cannot search if input is empty!')
            setShowAlert(true)
        }

    };

    useEffect(() => {
        setSubjects(data);
    }, [data]);

    // "Component that displays results or error messages"
    const ResultsDisplay = () => {

        if (loading) {
            return (
                <div style={{ paddingTop: '60px', textAlign: 'center'}}>
                    <CircularProgress />
                    <p> Finding Subjects related to: {searchValue} </p>
                </div>

            )
        } if (error) {
            return (
                <div style={{ paddingTop: '60px', textAlign: 'center'}}>
                    <p> {errorMessage} </p>
                </div>

            )
        }
        

        if (Object.keys(results).length < 1) {
            return  <p style={{textAlign: 'center'}}> Use the search bar to find subjects by name or subject code... </p>
        } else {
            return (
                Object.keys(results).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={results[subject]} />
                ))
            );
        }

    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant='h5' style={{ paddingTop: '10px' }}> Subject List Search </Typography>
                    </Grid>
                    <Grid item xs={4} alignItems={'flex-end'} alignContent={'flex-end'}>
                        <div className={classes.search}>
                            <Paper component='form' className={classes.root}>
                                <InputBase className={classes.input} placeholder='Search Subjects' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                <Divider className={classes.divider} orientation='vertical' />
                                <IconButton onClick={searchSubjects} className={classes.iconButton} aria-label='search'>
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <ResultsDisplay />
            </Container>
            <Alert open={showAlert} close={setShowAlert} message={alertMessage} />
        </>
    );
}

export default Search;
