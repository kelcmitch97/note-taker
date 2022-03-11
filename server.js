const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// Modules
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// API Route to get saved notes from db.json file 
app.get('/api/notes', (req, res) => {
   showNote(res);
});

// Route to save new notes to db.json file 
app.post('/api/notes', (req, res) => {
    saveNewNote(req.body, res);
});

// Route to delete notes based on ID 
app.delete('/api/notes/:id', (req, res) => {
    let data = readFromDB();
    let noteID = (req.params.id).toString();

    data = data.filter(selected => {
        return selected.id != noteID;
    })
    writeToFile(data, res);
});

// Reading database and showing saved notes
const showNote = (res) => {
    const data = readFromDB();
    res.send(data);
};
// Reading db.json file and returning array of notes 
const readFromDB = () => {
    let note = fs.readFileSync('./db/db.json', 'utf-8');
    return note = JSON.parse(note);
};

// Saving new note to database
const saveNewNote = (newNote, res) => {
    const data = readFromDB();
    let noteLength = (data.length).toString();
    newNote.id = noteLength;
    data.push(newNote);

    writeToFile(data, res);
};
// Adding ID to new note and saving it to db.json database 
const writeToFile = (data, res) => {
    data = JSON.stringify(data);
    fs.writeFile('./db/db.json', data, (err) => {
        if (err) {
            throw err;
        } else {
            res.send("New Note was saved successfully!");
        }
    });
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
