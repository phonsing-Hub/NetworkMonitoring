require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const path = require("path"); 
const { status } = require("./db");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//status(); //Check database connection status

const auth = require("./routers/auth.routes");

app.post("/api/token",(req, res) =>{
  try {
    const empToken = req.cookies._auth;
    if (!empToken) return res.status(401).json({ message: "isLogin" });
    
    const decodedToken = jwt.verify(empToken, process.env.JWT_SECRET_KEY);
    if(!decodedToken) return res.status(401).json({ message: "isLogin" });

    res.status(200).json({message: "success"});
  } catch (error) {
    return res.status(401).json({ message: "isLogin" });
  }});

app.use('/api',auth);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;