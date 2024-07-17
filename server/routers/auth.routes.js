const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../db"); //knex.js
const router = express.Router();

const VerifyToken = (req, res, next) => {
  try {
    const empToken = req.cookies._auth;
    if (!empToken) return res.status(401).json({ message: "Token is invalid" });

    const decodedToken = jwt.verify(empToken, process.env.JWT_SECRET_KEY);
    if (!decodedToken) return res.status(401).json({ message: "Token is invalid" });

    req.decodedToken = decodedToken; 
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Token is invalid" });
  }
}

router.post("/auth", async (req, res) => {
  try {
    const { name_id, password } = req.body;
    
    const result = await db
      .select("name_id", "password", "role")
      .from("UserCredentials")
      .where({
        name_id,
      });

    if (!result[0])
      return res.status(401).json({ emp: "Employee not found" });

    const isPasswordValid = await bcrypt.compare(password, result[0].password);

    if (!isPasswordValid)
      return res.status(401).json({ pwd: "Invalid password" });

    const auth = {
      name_id: result[0].name_id,
      role: result[0].role,
    };

    const token = jwt.sign({ auth }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res
      .cookie("_auth", token, {
        maxAge: 86400000,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Login unsuccessful" });
  }
});

router.put("/changepassword", VerifyToken, async (req, res) => {
  try {
    const { OldPassword, NewPassword } = req.body;
    if (!OldPassword || !NewPassword) 
      return res.status(401).json({ message: 'Old password and new password must not be empty.' });
    
    const decodedToken = req.decodedToken;
    const result = await db
      .select("name_id", "password")
      .from("UserCredentials")
      .where({ name_id: decodedToken.auth.name_id });

    if (!result[0])
      return res.status(401).json({ message: "Employee not found" });

    const isPasswordValid = await bcrypt.compare(OldPassword, result[0].password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid OldPassword" });

    const hashedNewPassword = await bcrypt.hash(NewPassword, 10);
    await db('UserCredentials')
      .where({ name_id: decodedToken.auth.name_id })
      .update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "changepassword unsuccessful" });
  }
});

router.get("/logout", (req, res) => {
  try {
    res
      .cookie("_auth", "", { expires: new Date(0), httpOnly: true })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
