var express = require("express");
var router = express.Router();
const blog_controller = require("../controllers/blog_controller");

/* GET all blog posts */
router.get("/", blog_controller.get_all_published_blog_posts);

/* GET specific blog post */
router.get("/:id", blog_controller.get_blog_post_by_id);

/* POST comment to blog post */
router.post("/:id", blog_controller.post_comment_blog_post);

/* GET comments on specific blog post */
router.get("/comments/:id/:skip", blog_controller.get_comments_blog_post);

module.exports = router;
