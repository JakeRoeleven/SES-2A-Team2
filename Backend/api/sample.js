const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
	res.send("hello");
});

router.get('/time', (req, res) => {
	let date = new Date();
	res.send(date.toLocaleTimeString().toString()); 
});

module.exports = router;