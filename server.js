const express = require('express');
const path = require('path');

const app = express();

const PORT = 3001; 

const savedNotes = require('./db/db.json');

//generates unique id dependencies
const generateUniqueId = require('generate-unique-id');
const id = generateUniqueId({
  length: 3,
  useLetters: false,
});

app.use(express.static('public'));

//Brings up homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')))

//Brings up notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Returns all saved notes from dv
app.get('/api/notes', (req, res) => {
  res.json(savedNotes)
})


app.listen(PORT, () => 
console.log(`Listening on PORT: ${PORT}`))

module.exports = app;