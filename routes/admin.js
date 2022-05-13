var express = require("express");
var router = express.Router();
const admin_controller = require("../controllers/admin_controller");

//GET test route for auth
router.get("/test", (req, res) => {
  return res.status(200).json(req.user);
});

router.get("/:skip", admin_controller.get_all_blog_posts);

//POST new blog post

router.post("/new", admin_controller.post_new_blog_post);

//PUT blog post update

router.put("/:id", admin_controller.update_blog_post);

//publish or unpublish a blog post

router.put("/publish/:id/", admin_controller.publish_unpublish);

//DELETE blog post by id

router.delete("/post/:id", admin_controller.post_delete);

//DELETE post by id

router.delete("/comment/:id", admin_controller.comment_delete);

module.exports = router;
