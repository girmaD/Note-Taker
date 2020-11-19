// Dependencies
// =============================================================
const express = require("express");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serving static files
app.use(express.static('public'))

// Routes - as imported from files shown below
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("Server running on port", PORT);
});

