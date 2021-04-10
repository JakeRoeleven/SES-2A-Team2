import React, { useState, useEffect, useCallback, useContext } from 'react';
import SubjectCard from './SubjectCard';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';

function SubjectList() {

    const data = useContext(AppContext);
    const [subjects, setSubjects] = useState({})

    useEffect(() => {
        setSubjects(data)
    }, [data]);


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

export default SubjectList;
