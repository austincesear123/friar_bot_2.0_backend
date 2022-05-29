const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { uploadImgUrlToS3, deleteImgFromS3 } = require("./s3");
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
  if (imageLocation.Location) {
    const playerData = {
      url: imageLocation.Location,
      playerName: req.body.playerName,
      user: req.body.user,
    };
    Player.create(playerData).then((player) => {
      res.json({
        status: 200,
        player: player,
      });
    });
  }
});

app.get("/friar_bot/get/:playerName", (req, res) => {
  Player.find({ playerName: req.params.playerName }).then((playerImgs) => {
    res.json({
      status: 200,
      playerImgs: playerImgs,
    });
  });
});

app.get("/friar_bot/id/:id", (req, res) => {
  Player.findById(req.params.id).then((img) => {
    res.json({
      status: 200,
      img: img,
    });
  });
});

app.delete("/friar_bot/delete", async (req, res) => {
  try {
    await deleteImgFromS3(req.body.playerName, req.body.key);
    Player.deleteOne({ _id: req.body.id }).then((img) => {
      res.json({
        status: 200,
        img: img,
      });
    });
  } catch (err) {
    console.log("error from back end", err);
  }
});

app.listen(process.env.PORT, () => console.log("listening on port 3000"));
