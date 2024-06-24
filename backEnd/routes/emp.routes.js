var express = require("express");
var router = express.Router();
var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();
var jwt = require("jsonwebtoken");
var {
  Employee,
  EmployeeAll,
  EmployeeID,
  CreateEmployee,
} = require("../controllers/emp.controller");

const CheckAuth = async (req, res, next) => {
  try {
    const empToken = req.cookies._auth;
    if (!empToken) {
      return res.status(401).json({ error: "Authorization token not found" });
    }
    const decodedToken = jwt.verify(empToken, "APL-PS");
    const empId = decodedToken.emp;
    const employeeCount = await prisma.employee.count({
      where: {
        id: empId,
      },
    });

    if (employeeCount == 0) {
      return res.status(401).json({ error: "Authorization token not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/", Employee);
router.get("/all", CheckAuth, EmployeeAll);
router.get("/:id", CheckAuth, EmployeeID);
router.post("/create",CheckAuth, CreateEmployee);

module.exports = router;
