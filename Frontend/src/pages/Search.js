import React, {useState, useEffect, useCallback, useContext} from 'react';
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

function Search() {

    const data = useContext(AppContext);
    const classes = useStyles();

    const [subjects, setSubjects] = useState({});
    const [results, setResults] = useState({});
    const [searchValue, setSearchValue] = useState('');

    const searchSubjects = async (key) => {
        setResults({});
        let searchHandler = new SearchHandler(subjects);
        let searchResults = await searchHandler.searchAllSubjects(key);
        setResults(searchResults)
    }

    const onChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        setSubjects(data)
    }, [data]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant='h5'> Subject List Search </Typography>
                </Grid>
                <Grid item xs={4} alignItems={'flex-end'} alignContent={'flex-end'}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            value={searchValue}
                            onChange={onChange}
                        />
                        <Button variant="contained" onClick={() => searchSubjects(searchValue)}>Search</Button>
                    </div>
                </Grid>
            </Grid>
                <Typography />
                <br />
                {Object.keys(results).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={results[subject]} />
                ))}
            </Container>
        </>
    ); 
}

export default Search;
