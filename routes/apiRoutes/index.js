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
    req.body.id = notes.length.toString();

    const note = saveNote(req.body, notes);
    res.json(note);
});

module.exports = router;