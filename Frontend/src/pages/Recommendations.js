import React, {useState, useEffect, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SubjectCard from '../components/SubjectCard';

import { AppContext } from '../AppContext';
import InterestsCard from '../components/InterestsCard';

function Recommendations() {  
    
    const data = useContext(AppContext);
    const [results, setResults] = useState({});
    
    const findSubjects = (recommendations) => {

        let subject_obj = {};

        //TODO : Replace this to hackey
        recommendations = recommendations.split(",")
        let subject_ids = [];
        recommendations.forEach(elem => {
            subject_ids.push(elem.replace(/\D/g, ''))
        })

        data.forEach(elem => {
            if (subject_ids.includes(elem._id)) {
                subject_obj[elem._id] = elem
            }
        })

        setResults(subject_obj);

    }

    const findRecommendations = (recommendations) => {  
        console.log(recommendations)
        fetch('http://localhost:8080/api/recommendation', {
            method: 'POST',
            body: JSON.stringify({
                "student": {
                    "interests": recommendations,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(async (res) => {
            let json = await res.json(res)
            findSubjects(json.recommendations)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant='h5'> Course Recommendations </Typography>
                    </Grid>
                </Grid>
                <br />
                <InterestsCard findRecommendations={findRecommendations}></InterestsCard>
                <br />
                {Object.keys(results).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={results[subject]} />
                ))}
            </Container>
        </>
    );
}

export default Recommendations;
