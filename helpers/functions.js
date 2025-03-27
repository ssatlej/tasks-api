import multer from "multer";

const storage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `public/uploads/${folder}`;
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const originalFileName = path.basename(file.originalname, fileExtension);
      const fileName =
        originalFileName.replace(/\s/g, "-").replace(/--/, "-") +
        "-" +
        uniqueSuffix +
        fileExtension;
      cb(null, fileName);
    },
  });
export const multerUpload = (folder = "", filter = null, limits = null) =>
    multer({ storage: storage(folder), fileFilter: filter, limits });

export const imageFileName = async (req, res) => {
    try {
      const data = req.file;
      if (req.file) {
        data.new_filename = data.destination.replace("public/", "") + "/" + data.filename;
        res.status(200).json({ status: 200, data });
      } else {
        res.status(400).json("something went wrong");
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  