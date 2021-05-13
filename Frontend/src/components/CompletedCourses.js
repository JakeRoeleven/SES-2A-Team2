import React, {useState, useEffect, useContext, useCallback} from 'react';
import Chip from '@material-ui/core/Chip';
import {AppContext} from '../AppContext';
import { useHistory } from "react-router-dom";

function CoursesCompleted(props) {
    
	let history = useHistory();
    const data = useContext(AppContext);

    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState({});

    const findSubjects = useCallback(() => {
        setCourses(props.courses);
        let subject_obj = {};
        data.forEach((elem) => {
            if (courses.includes(elem._id)) {
                subject_obj[elem._id] = elem;
            }
        });

        setSubjects(subject_obj);
    }, [courses, data, props.courses]);

    useEffect(() => {
        findSubjects();
    }, [findSubjects]);

    let limit = Object.keys(subjects).length;
    if (props.limit) limit = props.limit;

    if (courses.length > 0 && Object.keys(subjects).length > 0 && Object.keys(subjects).length > limit) {
        return (
            <>
                {Object.keys(courses)
                    .splice(0, limit)
                    .map((index) => (
                        <Chip style={{marginBottom: '10px', marginRight: '0.5%'}} label={courses[index]} color='primary'/>
                    ))}
                <Chip style={{marginBottom: '10px', marginRight: '0.5%'}} label={'Show All'} onClick={() => history.push('/completed')} />
            </>
        );
    } else if (courses.length > 0 && Object.keys(subjects).length > 0) {
		return (
            <>
                {Object.keys(courses)
                    .splice(0, limit)
                    .map((index) => (
                        <Chip style={{marginBottom: '10px', marginRight: '0.5%'}} label={courses[index]} color='primary'/>
                    ))}
                <Chip style={{marginBottom: '10px', marginRight: '0.5%'}} label={'More Details'} onClick={() => history.push('/completed')} />
            </>
        );
    } else {
        return <p>No Courses Completed...</p>;
    }
}

export default CoursesCompleted;
