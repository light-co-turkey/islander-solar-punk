const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MediaSchema = new Schema({
    usageType: { type: String, require: true },
    createdBy: { type: String, required: true },
    mediaBuffer: { type: Buffer, default: "no image" },
    mediaType: { type: String }
}, { timestamps: true });

module.exports = Post = mongoose.model("medias", MediaSchema);