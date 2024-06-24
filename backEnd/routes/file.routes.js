const express = require("express");
const router = express.Router();
const { UploadImg, Test } = require("../controllers/file.controller");

router.post("/upload", UploadImg);
router.post("/test", Test);

module.exports = router;
