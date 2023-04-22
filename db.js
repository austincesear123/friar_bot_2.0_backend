const mongoose = require("mongoose");
require("dotenv").config();

// let mongoURL = "";

// if (process.env.NODE_ENV === "production") {
//   mongoURL = process.env.DB_URL;
// } else {
//   mongoURL = "mongodb://localhost/friar-bot";
// }

mongoose.connect(process.env.DB_URL);

module.exports = mongoose;
