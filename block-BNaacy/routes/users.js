var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/new", (req, res, next) => {
  res.render("form.ejs");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.json(user);
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
      res.redirect("/new");
    });
});

router.get("/", (req, res, next) => {
  User.find({})
    .then((usersList) => {
      res.render("usersList", { list: usersList });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;