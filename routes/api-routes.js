// Dependencies
// 'uuid' is a npm package that generates unique id among other things. its v4 sub package is only
// required to generate a universally unique id.
// =============================================================
const fs = require("fs");
const { v4: uuid } = require('uuid');

// Exporting the function below for use in another file
// =============================================================
module.exports = function(app) {
    //express get request to '/api/notes'
    // it sends all the notes in the db.json to the frontend
    app.get("/api/notes", (req, res) => {            
        let rawnote = fs.readFileSync('./db/db.json');
        let notes = JSON.parse(rawnote);
        res.json(notes)
    })

    // a post request to '/api/notes'. It accepts incoming note, adds a unique id to it
    // and it saved it to the db.json
    // =============================================================
    app.post("/api/notes", (req, res) => {                 
        let newNote = {
            id: uuid(),
            title: req.body.title,
            text: req.body.text
        }
        fs.readFile('./db/db.json', function (err, data) {
            if(err) throw err;
            var savedNote = JSON.parse(data);
            savedNote.push(newNote);    
            fs.writeFile('./db/db.json', JSON.stringify(savedNote), function(err){
              if (err) throw err;
              console.log('new note effectively appeneded to an array in the db.json file');
            });            
        })
        res.send(newNote)              
    })

    // A delete request to "/api/notes/:id". it checks if there is matching id from savedNotes
    // if mathes, deletes that element of the array in the db.json
    // then sends the updated note to the frontend
    // =============================================================
    app.delete("/api/notes/:id", (req, res) => {
        const { id } = req.params;
        let savedNote;
        fs.readFile('./db/db.json', function (err, data) {
            if(err) throw err;
            savedNote = JSON.parse(data);
            savedNote.splice(savedNote.findIndex(ele => ele.id === id),1);                       
            fs.writeFile('./db/db.json', JSON.stringify(savedNote), function(err){
                if (err) throw err;
                console.log('not deleted by matching id');
            });            
        })
        res.send(savedNote)        
    })
}