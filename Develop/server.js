// Dependencies
// =============================================================
var express = require("express");
// const path = require("path")


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serving static files
app.use(express.static('public'))

// Routes
// =============================================================

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

