const Post = require("../models/post");
const Comment = require("../models/comment");

//GET all published blog posts
exports.get_all_published_blog_posts = async (req, res) => {
  try {
    const blog_data = await Post.find()
      .where("published")
      .equals(true)
      .sort({ date: -1 });

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
    return res.status(400).json({ error: e.message });
  }
};
//POST comment to a blog post
exports.post_comment_blog_post = async (req, res) => {
  console.log(req.body);
  try {
    const blog_post = await Post.findById(req.params.id).exec();
    const comment = new Comment({
      name: req.body.name,
      content: req.body.content,
      post: blog_post,
    });
    await comment.save();
    res.status(200).json({
      comment_id: comment._id,
      post_id: blog_post._id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
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

    res.send(comments);
  } catch (e) {
    res.send(e);
  }
};
