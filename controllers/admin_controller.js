const Post = require("../models/post");
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

// DELETE BLOG POST BY ID

// DELETE COMMENT BY ID

// UPDATE BLOG POST

//PUBLISH/UNPUBLISH A BLOG POST
