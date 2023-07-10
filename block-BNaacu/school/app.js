var express = require("express");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var studentRouter = require("./routes/students");

var app = express();

mongoose
  .connect("mongodb://127.0.0.1/school")
  .then(() => {
    console.log("Connected Successfully to school database");
  })
  .catch((err) => {
    console.log("Error connecting to school database");
});

// Set EJS as the template engine and views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middlewares to capture json data and form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Middlewares to look for routes
app.use("/", indexRouter);
app.use("/students", studentRouter);

// Error handling middleware for 404 (Not Found) errors
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Error handling middleware for 500 (Internal Server Error) errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
