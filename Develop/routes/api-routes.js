// requiring depedencies
const fs = require("fs");
const { v4: uuid } = require('uuid');

// exporting all the needed routes
module.exports = function(app) {
    app.get("/api/notes", (req, res) => {       
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