import React, {useState, useEffect} from 'react';

function SampleMenu() {
    const [accessTime, setAccessTime] = useState('');

    // Sample of a get request
    const fetchTime = async () => {
        fetch('/api/time')
            .then(async (res) => {
                // Normally server would pass back JSON - .json() to decode
                const time = await res.text();
                setAccessTime(time);
            })
            .catch(() => {
                setAccessTime('Error accessing server!');
            });
    };

    useEffect(() => {
        fetchTime();
    });

    return (
        <div className='menu'>
            <span> SES 2A </span>
            <div className='float-right'>
                <span>This page was last updated at: {accessTime} </span>
                <button onClick={fetchTime}> Refresh? </button>
            </div>
        </div>
    );
}

export default SampleMenu;
