import React, { useState } from 'react';
import SamplePostComponent from './PostChildComponent'

function SamplePost() {
    
    const [ wordToReverse, setWordToReverse ] = useState('');
    const [ reversedWord, setReversedWord ] = useState('None');

    const callback = (wordFromServer) => {
        setReversedWord(wordFromServer);
    }
    
    return (
        <div>

            Reverse a word!: 
            <input type="text" id="word" name="word" value={wordToReverse} onChange={e => setWordToReverse(e.target.value)}></input>
            
            <SamplePostComponent word={wordToReverse} callback={callback} />

            <p> Reversed Word is: {reversedWord} </p>

        </div>
    );

}

export default SamplePost;
