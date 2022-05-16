const Post = require("../models/post");
const Comment = require("../models/comment");

//GET published post count
exports.get_post_count = async (req, res) => {
  // add req.query functionality as in blog_posts, move to admin
  try {
    const count = await Post.countDocuments()
      .where("published")
      .equals(req.query.published);
    res.status(200).json(count);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.get_all_published_blog_posts = async (req, res) => {
  try {
    const blog_data = await Post.find()
      .where("published")
      .equals(true)
      .sort({ date: -1 })
      .skip(req.params.skip)
      .limit(10);

    res.status(200).json(blog_data);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

//GET a specific post by ID
exports.get_blog_post_by_id = async (req, res) => {
  //get comment data and blog post data and send back together
  try {
    const [comments, post] = await Promise.all([
      Comment.find()
        .where("post")
        .equals(req.params.id)
        .sort({ date: -1 })
        .exec(),
      Post.findById(req.params.id).exec(),
    ]);
    res.status(200).json({ comments: comments, post: post });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
//POST comment to a blog post
exports.post_comment_blog_post = async (req, res) => {
  try {
    const blog_post = await Post.findById(req.params.id).exec();
    const comment = new Comment({
      name: req.body.name,
      content: req.body.content,
      post: blog_post._id,
    });
    await comment.save();
    res.status(200).json({
      comment_id: comment._id,
      post_id: blog_post._id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
//GET all comments from a specific blog post
exports.get_comments_blog_post = async (req, res) => {
  try {
    const comments = await Comment.find()
      .where("post")
      .equals(req.params.id)
      .sort({ date: 1 })
      .skip(req.params.skip)
      .limit(5);

    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
