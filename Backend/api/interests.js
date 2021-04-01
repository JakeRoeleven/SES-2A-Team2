const express = require('express');
const router = express.Router();
const getAllInterests = require('../lib/InterestHelper').getAllInterests;

router.get('/interests', async (req, res) => {
    let interest_list = getAllInterests();
    res.status(200).json(interest_list);
});

module.exports = router;
