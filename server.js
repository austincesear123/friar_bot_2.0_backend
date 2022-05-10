const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { uploadImgUrlToS3 } = require("./s3");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

const fileName =
  "https://ca-times.brightspotcdn.com/dims4/default/0a19894/2147483647/strip/true/crop/3359x2239+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3d%2Fd0%2F4b1c818348bfaaf5c05861c3935a%2Fpadres-tatis-contract-baseball-96113.jpg";

const weirdFileName =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxliBTlc4ic4842ciPCLa1JTKenZDiagbXnubhy52HledfhQLGaooQJJvwB-MLctmju0&usqp=CAU";

app.post("/friar_bot/upload", async (req, res) => {
  const imageLocation = await uploadImgUrlToS3(req.body.url);
  res.json({
    status: 200,
    location: imageLocation.Location,
  });
});

app.listen(3000, () => console.log("listening on port 3000"));
