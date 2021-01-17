const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  roomName: String,
  roomCode: String,
  board: [[Number]],
  players: [{ name: String, id: String, score: Number }],
  mirrors: [{ location: { x: Number, y: Number }, leftMirror: Boolean }],
  currentTurn: Number,
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
