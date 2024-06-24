const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { auth, password } = req.body;

    const user = await prisma.employee.findFirst({
      where: {
        OR: [{ id: auth }, { email: auth }],
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ emp: "Employee not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ pwd: "Invalid password" });
    }

    const emp = user.id;
    const token = jwt.sign({ emp, role: user.role }, "APL-PS", {
      expiresIn: "24h",
    });

    res.cookie("_auth", token, {
      maxAge: 86400000, 
      httpOnly: true, 
      // secure: true, 
      // sameSite: "Strict", 
    });
 
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}; 

const Auth = async (req, res) => {
  try {
    const empToken = req.cookies._auth;
    if (!empToken) 
      return res.status(401).json({ message: "isLogin" });

    const decodedToken = jwt.verify(empToken, "APL-PS");
    const empId = decodedToken.emp;
    const employeeCount = await prisma.employee.count({
      where: {
        id: empId,
      },
    });

    if (employeeCount == 0) 
      return res.status(401).json({ message: "isLogin" });
    
    res.status(201).json({ message: "success" });

  } catch (error) {
    return res.status(500).json({ message: "isLogin" });
  }}

module.exports = { Login, Auth };
