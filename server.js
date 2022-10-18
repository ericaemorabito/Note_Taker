const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = 3001; 

const savedNotes = require('./db/db.json');

//generates unique id dependencies
const generateUniqueId = require('generate-unique-id');
// const id = generateUniqueId({
//   length: 32,
//   useLetters: false,
// });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Brings up notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Returns all saved notes from dv
app.get('/api/notes', (req, res) => {
  res.json(savedNotes)
})

//Post 
app.post('/api/notes', (req, res) => {
  //req = info coming in
  //res = info use to respond back
  const newNote = req.body;
  //ad an id to an object as a new property
  newNote.id = generateUniqueId()
  console.log(newNote)
  savedNotes.push(newNote)
  console.log(savedNotes)
  //add to saved note, then 
  //write this to the file ... 
  fs.writeFile('./db/db.json', JSON.stringify(savedNotes), (err) => {
    err ? console.log(err) : res.json(req.body);
  })
})

//Delete
app.delete('/api/notes/:id', (req, res) => {
  req.params.id
  console.log(req.params.id)
  //read db
  fs.readFile('./')
  //loop through all data looking for id
  //choose file and delete 
  //filter() -- condition and copy of array
  //splice() -- allow you to edit array 
  //re-write the file
})

//Wildcard -- keep at bottom
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => 
console.log(`Listening on PORT: ${PORT}`))