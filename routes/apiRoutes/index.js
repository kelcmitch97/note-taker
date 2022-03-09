// Notes API Route
const express = require('express');
const { disabled } = require('express/lib/application');
const router = express.Router();
// Database
const db = require('../../db/db.json');

// Save new notes to database
router.post('/api/notes', (req, res) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      let userNote = req.body;
      userNote.id = Math.floor(Math.random() * 5000);
      notes.push(userNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        res.json(userNote);
    });
    }); 
  });
  
  router.delete('/api/notes/:id', (req, res) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
    
    fs.writeFile(db, JSON.stringify(newNotes), (err, data) => {
      res.json({msg: 'successfully'});
    });
  });
  });
  
  router.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
  });
  
  router.get('/api/notes', (req, res) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });




// const addIdToNote = (newNote) => {
//     var id = 1;
//     newNote.forEach(element => {
//         element["id"] = id++;
//     });
//     return newNote;
// };
// Gets saved notes from db.json file
// router.get('/notes', (req, res) => {
//     showNotes(res);
// });

// const showNotes = (res) => {
//     let notes = readFromFile();
//     res.send(notes);
// }


// router.post('/notes', (req, res) => {
//     saveNote(req.body, res);
// });




// // Function to save new notes
// const saveNote = (body, res) => {
//     const notes = readFromFile();
//     notes.push(body);
//     writeToFile(notes, res);
// };

// const writeToFile = (notes, res) => {
//     notes = JSON.stringify(notes);
//     fs.writeFile("../../db/db.json", notes, (err) => {
//         if (err) {
//             res.send('Something went wrong');
//         } 
//         res.send('New note was successfully saved');
//     });
// };


module.exports = router;