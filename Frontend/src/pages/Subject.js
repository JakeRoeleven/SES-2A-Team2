import React, {useState, useEffect, useContext} from 'react';
import SubjectCard from '../components/SubjectCard';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../AppContext';

function Subject(props) {

    let history = useHistory();
    const data = useContext(AppContext);
    const [subject, setSubject] = useState();

    useEffect(() => {
        let search = props.location.search
        if (search) {
            let value = search.split('=')[1]
            for (let i = 0, length = data.length; i < length; i++) {
                let course = data[i];
                if (value === course._id) {
                    setSubject(course)
                }
            }
        } else {
            history.push("/search");
        }
    }, [data, history, props]);

    // "Component that displays results or error messages"
    const ResultsDisplay = (results) => {
        if (subject && subject._id) {
            return <SubjectCard key={subject._id} subject={subject} />
        } else {
            return (<p> Loading... </p>)
        }
    }

    return <ResultsDisplay />;

}

export default Subject;
