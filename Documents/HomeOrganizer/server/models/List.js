const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
  title: String,
  lists: [
    { category: String, importance: String, body: String, notes: String },
  ],
  created: String,
});

module.exports = mongoose.model("lists", listSchema);
