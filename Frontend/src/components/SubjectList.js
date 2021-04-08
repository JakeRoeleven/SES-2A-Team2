import React, { useState, useEffect, useCallback } from 'react';
import SubjectCard from './SubjectCard';
import CircularProgress from '@material-ui/core/CircularProgress';

function SubjectList(props) {

    const [subjects, setSubjects] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchSubjects = useCallback(async () => {
        fetch('http://178.128.216.237:8080/api/subjects', {
            crossDomain: true,
            mode:'cors',
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async (res) => {
            console.log(res)
            console.log("Found res")
            let data = await res.json();
            setSubjects(data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setError(err)
        });
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

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
                </div>

                {Object.keys(subjects).slice(0, 5).map((subject, key) => (
                    <SubjectCard key={key} subject={subjects[subject]} />
                ))}

            </div>
        )
    }
}

export default SubjectList;
