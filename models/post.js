const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostScehma = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
});

module.exports = mongoose.model("Post", PostScehma);
