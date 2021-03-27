import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';
import CircularProgress from '@material-ui/core/CircularProgress';

function SubjectList(props) {

    const [subjects, setSubjects] = useState({})
    const [loadTime, setLoadTime] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchSubjects = async () => {
        fetch('http://178.128.216.237:8080/api/py', {
            crossDomain: true,
            mode:'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        }).then(async (res) => {
            let data = await res.json();
            setSubjects(data)
            setLoadTime(data.run_time);
            console.log(subjects)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setError(err)
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

                <div>
                    <h2 style={{display: "inline-block"}}>Subjects Recommended for You</h2>
                    <p style={{float: "right"}}> 5 Subjects found in: {loadTime}s </p>
                </div>

                {Object.keys(subjects).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={subjects[subject]} />
                ))}

            </div>
        )
    }
}

export default SubjectList;
