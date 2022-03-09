const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// Modules
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// API Routes
app.get('/api/notes', (req, res) => {
   showNote(res);
});

app.post('/api/notes', (req, res) => {
    saveNewNote(req.body, res);
});

// Reading database and showing saved notes
const showNote = (res) => {
    const data = readFromFile();
    res.send(data);
};
const readFromFile = () => {
    let note = fs.readFileSync('./db/db.json', 'utf-8');
    return note = JSON.parse(note);
};












// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});
