const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  roomName: String,
  roomCode: String,
  board: [
    [
      {
        tileType: String,
        inputDirection: { x: Number, y: Number },
      },
    ],
  ],
  isActive: Boolean,
  players: [{ name: String, id: String, score: Number, location: { x: Number, y: Number } }],
  currentTurn: Number,
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
