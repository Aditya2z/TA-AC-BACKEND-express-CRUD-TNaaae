var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/new", (req, res, next) => {
  res.render("form.ejs");
});

router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
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
router.delete("/:id", (req, res, next) => {
    const userId = req.params.id;
    
    User.findByIdAndDelete(userId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        next(err);
      });
  });
  
  // Update User
  router.put("/:id", (req, res, next) => {
    const userId = req.params.id;
    
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        next(err);
      });
  });  

module.exports = router;