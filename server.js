const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { uploadImgUrlToS3 } = require("./s3");
const Player = require("./models/Player");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

// UPLOAD IMAGE TO S3 AND DB
app.post("/friar_bot/upload", async (req, res) => {
  const imageLocation = await uploadImgUrlToS3(
    req.body.url,
    req.body.playerName
  );
  const playerData = {
    url: imageLocation.Location,
    playerName: req.body.playerName,
  };
  Player.create(playerData).then((player) => {
    res.json({
      status: 200,
      player: player,
    });
  });
});

app.get("/friar_bot/get/:playerName", (req, res) => {
  Player.find({ playerName: req.params.playerName }).then((playerImgs) => {
    res.json({
      status: 200,
      playerImgs: playerImgs,
    });
  });
});

app.listen(3000, () => console.log("listening on port 3000"));
