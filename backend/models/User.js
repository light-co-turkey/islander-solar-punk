const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  followers: { type: Array },
  following: { type: Array },
  resetToken: { type: String },
  expirationToken: { type: Date },
  //Date
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("users", UserSchema);