const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  filterFilter: (req, file, next) => {
    const allowed = ["image/jpg", "image/jpeg", "image/png"];
    if (asllowed.includes(file.mimetype)) {
      next(null, true);
    } else {
      next({ message: "Arquivo não suprotado" }, false);
    }
  },
};
exports.upload = multer(multerOptions).single("photo");
exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const ext = req.file.mimetype.split("/")[1];
  let filename = `${uuid.v4()}.${ext}`;
  req.body.photo = filename;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/media/${filename}`);
  next();
};
