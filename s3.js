require("dotenv").config();
const AWS = require("aws-sdk");
const fetch = require("node-fetch");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  
  const fileName =
    "https://ca-times.brightspotcdn.com/dims4/default/0a19894/2147483647/strip/true/crop/3359x2239+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3d%2Fd0%2F4b1c818348bfaaf5c05861c3935a%2Fpadres-tatis-contract-baseball-96113.jpg";
  
  const weirdFileName =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxliBTlc4ic4842ciPCLa1JTKenZDiagbXnubhy52HledfhQLGaooQJJvwB-MLctmju0&usqp=CAU";
  
  async function upload(url) {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") ?? undefined;
    const contentLength =
      response.headers.get("content-length") != null
        ? Number(response.headers.get("content-length"))
        : undefined;
  
    return s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "tatis01.jpg",
        ContentType: contentType,
        ContentLength: contentLength,
        Body: response.body, // buffer
      })
      .promise()
      .then((data) => console.log(data, response.status))
      .catch((error) => console.log(error));
  }
  
  upload(fileName);