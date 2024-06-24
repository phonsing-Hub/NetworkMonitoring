var express = require("express");
const bcrypt = require('bcrypt');
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function generateRandomPassword(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

router.get("/", async (req, res) => {
  try {
    const users = await prisma.employee.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      emp_birth_date,
      emp_department,
      emp_email,
      emp_lastname,
      emp_name,
      emp_phone,
      emp_sex,
      district,
      homeNumber,
      province,
      subdistrict,
      zipCode
    } = req.body;

    const employeeCount = await prisma.employee.count();
    const id = `AP${String(employeeCount + 1).padStart(4, '0')}`;
    const password = generateRandomPassword(6);
    await prisma.employee.create({
      data: {
        id,
        name:  emp_name,
        lastname:  emp_lastname,
        password,
        sex: emp_sex,
        birthday: new Date(emp_birth_date),
        email:  emp_email,
        phone:  emp_phone,
        department: emp_department,
      }
    });

    await prisma.address.create({
      data:{
        district,
        homeNumber,
        province,
        subdistrict,
        zipCode,
        emp_id: id
      }
    });
    res.status(201).json({ message: 'Employee data received successfully', data: req.body });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
