// Dependencies
// =============================================================
const path = require("path");

// Exporting the function below for use in another file
// =============================================================
module.exports = function(app) {
    // get route to "/notes" that sends 'notes.html' file
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });
    // get route to everything else  sent to localhost:3000
    // sends 'index.html' page
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
}