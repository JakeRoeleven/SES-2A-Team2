import React, {useState} from 'react'

function Sample() {

    // Example of a state variable
    const [ count, setCount ] = useState(0);

    // Example of a method the manipulates/updates/mutates state
    const addCount = () => {
        let current = count;
        setCount(current++);
    } 

    // A component returns JSx 
    return (
        <>
            <span> {count} </span>
            <button onClick={addCount}> Add to count </button>
        </>
    )


}

export default Sample;