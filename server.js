const express = require("express");
require("dotenv").config();
import AWS from "aws-sdk";

const app = express();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

app.post("/friar_bot/upload", (req, res) => {
  res.send("upload image route hit");
});

app.listen(3000, () => console.log("listening on port 3000"));
