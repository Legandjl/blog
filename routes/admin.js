var express = require("express");
var router = express.Router();
const admin_controller = require("../controllers/admin_controller");

router.get("/", admin_controller.get_all_unpublished_blog_posts);
//GET test route for auth

router.get("/test", (req, res) => {
  return res.status(200).json(req.user);
});

//POST new blog post

router.post("/new", admin_controller.post_new_blog_post);

//PUT blog post update

router.put("/:id", (req, res, next) => {
  res.send("UPDATE A BLOG POST");
});

//DELETE blog post by id

router.delete("/post/:id", admin_controller.post_delete);

//DELETE post by id

router.delete("/comment/:id", admin_controller.comment_delete);

//publish or unpublish a blog post

module.exports = router;
