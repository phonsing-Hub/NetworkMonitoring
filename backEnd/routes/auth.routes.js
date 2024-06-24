var express = require("express");
const { Login, Auth } = require("../controllers/auth.controller");
var router = express.Router();

router.post("/", Login);
router.post("/token", Auth);

module.exports = router;