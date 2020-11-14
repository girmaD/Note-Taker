const data = require("../db/db.json")

module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        res.json(data)
    })
    app.post("/api/notes", (req, res) => {
        let newdata = req.body;
        data.push(newdata);
        res.json(data[data.length - 1]);
    })
}