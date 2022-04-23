const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScehma = new Schema({
  name: { type: String, maxlength: 20, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserScehma);
