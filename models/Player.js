const mongoose = require("../db");

const playerSchema = new mongoose.Schema({
  url: String,
  playerName: String,
});

module.exports = mongoose.model("Player", playerSchema);
