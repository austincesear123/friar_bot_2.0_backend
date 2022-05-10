const express = require("express");
require("dotenv").config();
const AWS = require("aws-sdk");
const fetch = require("node-fetch");

const app = express();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const fileName =
  "https://ca-times.brightspotcdn.com/dims4/default/0a19894/2147483647/strip/true/crop/3359x2239+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3d%2Fd0%2F4b1c818348bfaaf5c05861c3935a%2Fpadres-tatis-contract-baseball-96113.jpg";

// function addPhoto(albumName) {
//     const upload = s3.upload({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: "tatis01.jpg",
//       Body: fileName,
//     });

//     const promise = upload.promise();

//     promise.then(
//       function (data) {
//         const downloadParams = {
//           Key: data.Key,
//           Bucket: process.env.AWS_BUCKET_NAME,
//         };
//         console.log("Successfully uploaded photo.", data);
//       },
//       function (err) {
//         return console.log(
//           "There was an error uploading your photo: ",
//           err.message
//         );
//       }
//     );
// }

// addPhoto();

async function upload(url) {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") ?? undefined;
  const contentLength =
    response.headers.get("content-length") != null
      ? Number(response.headers.get("content-length"))
      : undefined;

  return s3
    .putObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "tatis01.jpg",
      ContentType: contentType,
      ContentLength: contentLength,
      Body: response.body, // buffer
    })
    .promise()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

upload(fileName);

// app.post("/friar_bot/upload", (req, res) => {
//   upload(fileName);
//   res.send("upload image route hit");
// });

// app.listen(3000, () => console.log("listening on port 3000"));
