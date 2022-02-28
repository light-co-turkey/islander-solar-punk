const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DaoSchema = new Schema({
  title: { type: String, required: true },
  handle: { type: String, required: true},
  settings: { type: Object },
  members: { type: Array },
  proposals: { type: Array },
  //Date
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("daos", DaoSchema);