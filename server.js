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
    const data = readFromDB();
    res.send(data);
};
const readFromDB = () => {
    let note = fs.readFileSync('./db/db.json', 'utf-8');
    return note = JSON.parse(note);
};

// Saving new note to database
const saveNewNote = (newNote, res) => {
    const data = readFromDB();
    data.push(newNote);
    writeToFile(data, res);
};
const writeToFile = (data, res) => {
    data = addUniqueId(data);
    data = JSON.stringify(data);
    fs.writeFile('./db/db.json', data, (err) => {
        if (err) {
            throw err;
        } else {
            res.send("New Note was saved successfully!");
        }
    });
};
const addUniqueId = (data) => {
    var id = 1;
    data.forEach(element => {
        element["id"] = id++;
    });
    return data;
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
