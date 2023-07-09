// Import required modules
const express = require("express");

// Create the Express application
const school = express();

school.set("view engine", "ejs");
school.set("views", __dirname + "/views");

school.get("/", (req, res) => {
    res.render("school");
})

// Start the server
const port = 3000;
school.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
