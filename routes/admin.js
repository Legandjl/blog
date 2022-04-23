var express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  if (req.user) {
    res.send({ id: req.user._id, name: req.user.name });
  } else {
    res.send("no");
  }
});

router.put("/:id", (req, res, next) => {
  res.send("UPDATE A BLOG POST");
});

router.delete("/:id", (req, res, next) => {
  res.send("DELETE A BLOG POST");
});

//publish or unpublish a blog post

module.exports = router;
