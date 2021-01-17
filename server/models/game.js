const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  roomName: String,
  roomCode: String,
  board: [[Number]],
  players: [{ name: String, id: Number, score: Number }],
  mirrors: Number,
  currentTurn: Number,
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
