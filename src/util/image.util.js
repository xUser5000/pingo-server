const ImageKit = require("imagekit");
const FileType = require("file-type");

const imagekit = new ImageKit({
  publicKey: process.env["IMAGEKIT_PUBLIC_KEY"],
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  urlEndpoint: process.env["IMAGEKIT_URL_ENDPOINT"]
});

/**
 * @async
 * @description Uploads image data to ImageKit API
 * @param {String} base64 The base64 encoded data of the image to be uploaded
 * @returns {String} The cdn url of the image
 */
module.exports.upload = async base64 => {
  return (
    await imagekit.upload({
      file: base64,
      fileName: "pingo",
      responseFields: "url"
    })
  ).url;
};

/**
 * @async
 * @description checks the type of a file to see if it's an image or not
 * @param {String} base64 Base64 data of a file
 * @returns {Boolean}
 */
module.exports.isImage = async base64 => {
  const mimeInfo = await FileType.fromBuffer(Buffer.from(base64, "base64"));
  const type = mimeInfo.mime.split("/")[0];
  return type === "image";
};
