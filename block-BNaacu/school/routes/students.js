var express = require("express");
var router = express.Router();
var Student = require("../models/student");

router.get("/new", (req, res, next) => {
  res.render("form.ejs");
});

router.post("/", (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
    Student.find({})
      .then((students) => {
        res.render("students", { list: students });
      })
      .catch((err) => {
        next(err);
      });
  });
  

  router.get("/:id", (req, res, next) => {
    const studentId = req.params.id;
    
    Student.findById(studentId)
      .then((student) => {
        res.render("students", { list: [student] });
      })
      .catch((err) => {
        next(err);
      });
  });
  

module.exports = router;
