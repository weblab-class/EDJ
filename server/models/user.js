const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  boards: [{name: String, board: [[String]]}],
  wins: Number,
  losses: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
