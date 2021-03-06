const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
	res.send("hello");
});

router.get('/time', (req, res) => {
	let date = new Date();
	res.send(date.toLocaleTimeString().toString()); 
});

router.post('/reverse', (req, res) => {

	console.log(req.body)

	const word = req.body.word;

	if (!word) {
        return res.status(400).json(JSON.stringify(`Error with your input please try again!`));
    }

	reversedWord = word.toString().split('').reverse().join('');

	return res.status(200).json({ reverse: reversedWord});

});

module.exports = router;