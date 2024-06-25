var express = require("express");
const { Login, Auth } = require("../controllers/auth.controller");
var router = express.Router();

router.post("/", Login);
router.post("/token", Auth);
router.get("/logout", (req, res) => {
  res.cookie("_auth", "", { expires: new Date(0), httpOnly: true });
  res.send("Logged out and cookie has been cleared");
});

module.exports = router;
