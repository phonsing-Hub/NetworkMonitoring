require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const moment = require('moment-timezone'); 
const cors = require('cors');
const rfs = require('rotating-file-stream');
const jwt = require("jsonwebtoken");
const { status } = require("./db");
const path = require("path"); 
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const corsOptions = {
  origin: ["http://localhost:5173","http://192.168.1.46:5173"],
  credentials: true,
};

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

morgan.token('date', (req, res, tz) => {
  const bangkokTime = moment().tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  // console.log(bangkokTime);
  return bangkokTime;
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
status(); //Check database connection status

const auth = require("./routers/auth.routes");
const ping = require("./routers/ping.routes");
const location = require("./routers/location.routes");

app.get("/", (req, res) => {
  res.render("index");
});
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

app.use('/api', auth);
app.use('/api', ping);
app.use('/api', location);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;