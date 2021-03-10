import React from 'react';

function SamplePostComponent(props) {

    const fetchData = async () => {
        fetch('/api/reverse', {
            method: 'POST',
            body: JSON.stringify({word: props.word}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                if (res.status === 200) {
                    let json = await res.json()
                    props.callback(json.reverse)
                } else {
                    props.callback('Failed to reverse word');
                }
            })
            .catch((err) => {
                console.log(err)
                props.callback('Failed to reverse word');
            });
    };

    return <button onClick={fetchData}> Reverse </button>;
}

export default SamplePostComponent;
