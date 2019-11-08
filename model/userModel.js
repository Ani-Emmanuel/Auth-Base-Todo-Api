const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: { type: String, required: true, min: 5 },
  username: { type: String, required: true, min: 5 },
  password: { type: String, required: true, min: 5 },
  claim: [String]
});

module.exports = mongoose.model("User", userSchema);
