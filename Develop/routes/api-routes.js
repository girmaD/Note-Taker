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

        fs.readFile('./db/db.json', function (err, data) {
            if(err) throw err;
            var json = JSON.parse(data);
            json.push(newnote);    
            fs.writeFile('./db/db.json', JSON.stringify(json), function(err){
              if (err) throw err;
              console.log('new note effectively appeneded to the db.json file');
            });
        })

        res.send(newnote)      
    })
}