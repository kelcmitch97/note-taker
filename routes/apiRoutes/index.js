// Notes API Route
const express = require('express');
const router = express.Router();

const notes = require('../../db/db.json');

// Gets saved notes from db.json file
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;