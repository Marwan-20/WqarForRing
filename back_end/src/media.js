const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { db } = require("./DBoperation");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloudinary_NAME,
  api_key: process.env.Cloudinary_API_Key,
  api_secret: process.env.Cloudinary_API_Secrt,
});

async function upload(imgUrl) {
  try {
    const result = await cloudinary.uploader.upload(imgUrl, {
      folder: "product_img",
    });

    return result.secure_url;
  } catch (error) {
    console.log(`the error oucuer in the media file: ${error}`);
    throw error;
  }
}

// delting a pictuer from the server

//  function to extract the id

function getID(url) {
  try {
    const parts = url.split("/");
    const folderAndFile = parts.slice(parts.indexOf("upload") + 2).join("/");
    return folderAndFile.split(".")[0];
  } catch (error) {
    return null;
  }
}
async function remove(rowId) {
  return new Promise((resolve, reject) => {
    // extract the img Urls from the DB
    const sql = `SELECT image1, image2, image3 FROM product WHERE id = ?`;

    db.get(sql, [rowId], async (e, row) => {
      if (e) {
        console.log(`error with extracting the imgs URL: ${e}`);
        return reject(e);
      }

      if (!row) {
        console.log(`there is no row with the id: ${rowId}`);
        return resolve(null);
      }

      try {
        // filter the imgs Url

        const imgsUrl = [row.image1, row.image2, row.image3];
        const filteredImgsUrl = imgsUrl
          .filter((url) => url !== null)
          .map((url) => getID(url));

        // deleting
        const result = await cloudinary.api.delete_resources(filteredImgsUrl);
        console.log(`the img deletion process DONE: ${result}`);
        return resolve(result);
      } catch (e) {
        console.log(`error in the detion method :${e}`);
        reject(e);
      }
    });
  });
}

module.exports = { upload, remove };
