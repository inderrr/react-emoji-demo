const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({ text: { type: String } });

module.exports = mongoose.model("Post", PostSchema);
