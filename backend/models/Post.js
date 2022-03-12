const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    createdBy: { type: String, required: true },
    draftJsRaw: { type: String, required: true },
    comments: {type: Array},
    settings: {type: Object}
}, { timestamps: true });

module.exports = Post = mongoose.model("posts", PostSchema);