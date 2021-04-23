import React, {useState, useEffect, useCallback} from 'react';
import Select from 'react-select';

function MajorSelect(props) {

    const [majors, setMajors] = useState([]);

    const handleSelectInputChange = async (event, ) => {
		let value = event.value;
		console.log(value)
    }

    const setMajorsDropdownList = (majors_array) => {
        let majors_obj_array = [];
        majors_array.forEach(elem => {
            majors_obj_array.push({value: elem, label: elem});
        })
        setMajors(majors_obj_array)
    }

    // Fetch full subject list from API
	const fetchMajors = useCallback(async () => {
		fetch(`http://localhost:8080/api/interests`, {
			crossDomain: true,
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).then(async (res) => {
			setMajorsDropdownList(await res.json());
		}).catch((err) => {
			console.log(err);
		});
	}, []);

    useEffect(() => {
        fetchMajors()
    }, [fetchMajors]);

    return (
        <Select
            name='majors'
            required
            options={majors}
            defaultValue={majors}
            placeholder={'Select Faculty...'}
            onChange={(e) => handleSelectInputChange(e)}
        />
    );
}

export default MajorSelect;
