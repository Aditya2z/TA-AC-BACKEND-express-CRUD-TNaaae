var express = require("express");
var router = express.Router();
var User = require("../models/user");

// New User Form
router.get("/new", (req, res, next) => {
  res.render("form.ejs");
});

// Create User
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.redirect("/users/" + user._id);
    })
    .catch((err) => {
      next(err);
    });
});

// All Users List
router.get("/", (req, res, next) => {
  User.find({})
    .then((usersList) => {
      res.render("usersList", { list: usersList });
    })
    .catch((err) => {
      next(err);
    });
});

// Single User
router.get("/:id", (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      res.render("singleUser", { user: user });
    })
    .catch((err) => {
      next(err);
    });
});

// Delete User
router.get("/:id/delete", (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
});

// Update User Form
router.get("/:id/edit", (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
  .then((user) => {
    res.render("updateUserForm", { user: user });
  })
  .catch((err) => {
    next(err);
  });
})

// Update user
router.post("/:id/edit", (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      res.redirect("/users/" + userId);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
