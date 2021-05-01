import React, {useState, useEffect, useCallback} from 'react';
import Select from 'react-select';

function InterestSelect(props) {

    const [interests, setInterests] = useState([]);

    const handleSelectInputChange = async (event) => {

        // Get array of objects 
        let value_array = await event;

        // Reduce to array of interests
        let filtered_interests = []
        let displayed_interests = []
        value_array.forEach((elem) => {
            filtered_interests.push(elem.value)
            displayed_interests.push(elem)
        });

        // Only allow 3 interests
        if (filtered_interests.length < 4) {
            props.setCurrentInterests(filtered_interests);			
            props.setDisplayedInterests(displayed_interests)
        }		
    }

    const setInterestsDropdownList = (interests_array) => {
        let interests_obj_array = [];
        interests_array.forEach(elem => {
            interests_obj_array.push({value: elem, label: elem});
        })
        setInterests(interests_obj_array)
    }

    // Fetch full subject list from API
	const fetchInterests = useCallback(async () => {
		fetch(`http://localhost:8080/api/interests`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			setInterestsDropdownList(await res.json());
		}).catch((err) => {
			console.log(err);
		});
	}, []);

    

    useEffect(() => {
        fetchInterests()
    }, [fetchInterests]);

    return (
        <Select
            type='interests'
            name='interests'
            required
            options={interests}
            defaultValue={interests}
            isMulti
            placeholder={'Select Interests...'}
            value={props.displayed_interests}
            onChange={(e) => handleSelectInputChange(e)}
        />
    );
}

export default InterestSelect;
