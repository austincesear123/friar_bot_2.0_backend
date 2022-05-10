require("dotenv").config();
const AWS = require("aws-sdk");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

async function uploadImgUrlToS3(url, playerName) {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") ?? undefined;
  const contentLength =
    response.headers.get("content-length") != null
      ? Number(response.headers.get("content-length"))
      : undefined;

  return s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${playerName}/${uuidv4()}.jpg`,
      ContentType: contentType,
      ContentLength: contentLength,
      Body: response.body, // buffer
    })
    .promise();
}

exports.uploadImgUrlToS3 = uploadImgUrlToS3;
