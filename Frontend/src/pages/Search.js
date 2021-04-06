import React, {useState, useEffect, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

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
    const classes = useStyles();
    const [subjects, setSubjects] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = useCallback(async () => {
        fetch('http://localhost:8080/api/subjects', {
            crossDomain: true,
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(async (res) => {
                if (res.status === 200) {
                    let json = await res.json();
                    setSubjects(json);
                } else {
                    setError(true);
                    setErrorMessage(
                        'The application failed to get the subject list. Please try again later'
                    );
                }
            })
            .catch((err) => {
                setError(true);
                setErrorMessage(
                    'The application failed to get the subject list. Please try again later'
                );
            });
    }, []);

    useEffect(() => {
        if (Object.keys(subjects).length < 1000) fetchData();
    }, [fetchData, subjects]);

    const Heading = () => {
        return (
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
                        />
                        <Button variant="contained">Search</Button>
                    </div>
                </Grid>
            </Grid>
        );
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Heading />
                <Typography />
            </Container>
        </>
    );
}

export default Search;
