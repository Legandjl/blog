const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");
//GET all published blog posts
exports.get_all_unpublished_blog_posts = async (req, res) => {
  try {
    const blog_data = await Post.find()
      .where("published")
      .equals(false)
      .sort({ date: -1 });
    res.status(200).json(blog_data);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

// ADD NEW BLOG POST

exports.post_new_blog_post = [
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("content", "content must be specified").isLength({ min: 1 }).trim(),
  async (req, res) => {
    console.log(req.body);
    console.log("posting");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    } else {
      try {
        const post = new Post({
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
        });
        await post.save();
        res.status(200).json({
          post_id: post._id,
        });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }
  },
];

// DELETE BLOG POST BY ID
exports.post_delete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    return res
      .status(200)
      .json({ message: `Post with ID ${req.params.id} deleted` });
  } catch (e) {
    return res.status(400).json({ error: "Post could not be removed" });
  }
};

// DELETE COMMENT BY ID

exports.comment_delete = async (req, res, next) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    return res
      .status(200)
      .json({ message: `Comment with ID ${req.params.id} deleted` });
  } catch (e) {
    return res.status(400).json({ error: "Comment could not be removed" });
  }
};

// UPDATE BLOG POST

//PUBLISH/UNPUBLISH A BLOG POST
