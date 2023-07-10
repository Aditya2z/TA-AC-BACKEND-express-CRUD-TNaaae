var express = require("express");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");

var app = express();

mongoose
  .connect("mongodb://127.0.0.1/user-diary")
  .then(() => {
    console.log("Connected Successfully to user-diary database");
  })
  .catch((err) => {
    console.log("Error connecting to user-diary database");
});

// Set EJS as the template engine and views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middlewares to capture json data and form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Middlewares to look for routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// Error handling middleware for 404 (Not Found) errors
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Error handling middleware for 500 (Internal Server Error) errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

//Setting up the server
app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
