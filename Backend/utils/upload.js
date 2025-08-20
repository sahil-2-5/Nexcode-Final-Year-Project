const cloudinary = require("../utils/couldinaryConfig");
const streamifier = require("streamifier");

const upload = (file) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        folder: "ProfilePic", 
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      },
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

module.exports = upload;
