// requiring modules this application depends on
const express = require("express");

// invoking express and calling it app
const app = express();
//setting up the port for both deployment environment and localhost
const PORT = process.env.PORT || 3000;

// body parsers for json and urlencoded load files
app.use(express.urlencoded({extended: true}));
app.use(express.json);

require("./routes/api-routes")(app)
require("./routes/html-routes")(app);

// listening to the port set above
app.listen(PORT, () => {
    console.log("This server is running on port", PORT)
})



