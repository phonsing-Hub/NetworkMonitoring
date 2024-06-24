const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

const UploadImg = (req, res) => {
  try {
    upload.single("images")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
  
      res.status(200).json({
        message: "Upload successfully",
        file: req.file,
        url: `/images/${req.file.filename}`,
      });
    });
    
  } catch (error) {
    res.status(500).json({Message: error.message});
  }
};

const Test = (req, res)=>{
  console.log(req.body);
  res.status(200).send("OK");
}
module.exports = { UploadImg, Test };
