var express = require("express");
var router = express.Router();
const blog_controller = require("../controllers/blog_controller");

/* GET home page. */
router.get("/", blog_controller.get_all_published_blog_posts);

router.get("/unpublished", blog_controller.get_all_unpublished_blog_posts);

router.get("/:id", blog_controller.get_blog_post_by_id);

router.get("/comments/:id", blog_controller.get_comments_blog_post);

router.post("/:id", blog_controller.post_comment_blog_post);

module.exports = router;
