const express = require("express");

const app = express();

app.post("/friar_bot/upload", (req, res) => {
  upload(fileName);
  res.send("upload image route hit");
});

app.listen(3000, () => console.log("listening on port 3000"));
