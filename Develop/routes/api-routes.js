// const data = require("../db/db.json");
const fs = require("fs");
const { join } = require("path");

module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        // res.json(data)
        // fs.readFile('./db/db.json', "utf8", (err, notes) => {
        //     if (err) throw err;            
        //     notes = JSON.parse(notes)
        //     console.log(notes);
        //     res.json(notes)
        // });
        let rawnote = fs.readFileSync('./db/db.json');
        let notes = JSON.parse(rawnote);
        res.json(notes)
    })

    app.post("/api/notes", (req, res) => {
        let newnote = req.body;
        //taken from https://gist.github.com/gordonbrander/2230317 
        var ID = function () {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
        }    
        let saveNote = {
            id: ID(),
            title: newnote.title,
            text: newnote.text
        }

        fs.readFile('./db/db.json', function (err, data) {
            if(err) throw err;
            var savedNote = JSON.parse(data);
            savedNote.push(saveNote);    
            fs.writeFile('./db/db.json', JSON.stringify(savedNote), function(err){
              if (err) throw err;
              console.log('new note effectively appeneded to an array in the db.json file');
            });
        })
        res.json(saveNote)      
    })

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