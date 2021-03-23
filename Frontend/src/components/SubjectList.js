import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';
import CircularProgress from '@material-ui/core/CircularProgress';

function SubjectList(props) {

    const [subjects, setSubjects] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchSubjects = async () => {
        fetch('/api/random').then(async (res) => {
            let data = await res.json();
            setSubjects(data)
            console.log(subjects)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    if (loading || error) {
        return (
            <div style={{paddingTop: "10%"}}>
                <center><CircularProgress /></center>
            </div>
        )
    } else {
        return (
            <div style={{padding: "2%"}}>

                <h2>Subjects Recommended for You</h2>

                {Object.keys(subjects).slice(0, 4).map((subject, key) => (
                    <SubjectCard key={key} subject={subjects[subject]} />
                ))}

            </div>
        )
    }
}

export default SubjectList;
