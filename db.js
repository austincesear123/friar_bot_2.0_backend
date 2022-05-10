const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/friar-bot");

module.exports = mongoose;
