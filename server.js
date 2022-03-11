const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// Modules
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

console.log(uuidv4());

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

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    const note = showNote(res);

    const findNoteId = (note, id) => {
        for (let i = 0; i < note.length; i++) {
            if (note[i].id === parseInt(id)) {
                return i;
            }
        }
        return -1;
    }

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send("Sorry, something went wrong");
        }

        let notes = JSON.parse(data);
        const notesIndex = findNoteId(note, id);

        if(notesIndex === -1) {
            return response.status(404).send("sorry, ID not found");
        }

        notes[notesIndex].complete = true;

        notes.splice(notesIndex, 1);

        fs.writeFile('./db/db.json', JSON.stringify(notes), () => {
            return response.json( {'status': 'Deleted ID' + id});
        })
    })
})

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

// Deleting notes 


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
