const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: { type: String, maxlength: 20, default: "Anonymous" },
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
