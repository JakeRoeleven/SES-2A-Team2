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
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    if (loading || error) {
        return <CircularProgress />
    } else {
        return (
            <div>
                {Object.keys(subjects).map((subject, key) => (
                    <SubjectCard key={key} subject={subjects[subject]} />
                ))}
            </div>
        )
    }
}

export default SubjectList;
