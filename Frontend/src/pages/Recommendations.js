import React, {useState, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SubjectCard from '../components/SubjectCard';
import Button from '@material-ui/core/Button';

import { AppContext } from '../AppContext';
import InterestsCard from '../components/InterestsCard';

function Recommendations() {  
    
    const data = useContext(AppContext);

    const [results, setResults] = useState({}); 
    const [completed, setCompleted] = useState(false);
   
    const findSubjects = (recommendations) => {
        let subject_obj = {};
        let subject_ids = recommendations;
        data.forEach(elem => {
            if (subject_ids.includes(elem._id)) {
                subject_obj[elem._id] = elem
            }
        })
        setResults(subject_obj);
    }

    const findRecommendations = (student) => {  
        fetch(`http://${process.env.REACT_APP_SERVER}/api/recommendation`, {
            method: 'POST',
            body: JSON.stringify({student}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            let json = await res.json(res)
            findSubjects(json.recommendations)
        }).catch((err) => {
            console.log(err)
        });
    }

    const callback = (data) => {
        
        let curr_res =  results;
        let new_res = {}
        
        Object.keys(curr_res).forEach(elem => {
            if (!data.includes(elem)) {
                new_res[elem] = curr_res[elem]
            }
        });

        setResults(new_res);
        setCompleted(data);

    }

    const ResetButton = () => {
        if (Object.keys(results).length > 0) {
           return <Button variant="contained" style={{ float: 'right' }} onClick={() => setResults({})}> Reset Recommendations</Button>
        } else {
           return null;
        }
    }

    const Results = () => {
        if (Object.keys(results).length > 0) {
            return (
                Object.keys(results).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={results[subject]} callback={callback} />
                ))
            )
         } else {
            return <p style={{ textAlign:'center' }}>  </p>;
         }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant='h5'> Course Recommendations </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <ResetButton />
                    </Grid>
                </Grid>
                <br />
                <InterestsCard completed={completed} findRecommendations={findRecommendations}></InterestsCard>
                <br />
                <Results />
            </Container>
        </>
    );
}

export default Recommendations;
