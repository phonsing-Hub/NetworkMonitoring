var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
// var path = require("path");
 var multer = require("multer");

function generateRandomPassword(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, id + ext);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) cb(null, true);
    else cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter,
  });


const CreateEmployee = async (req, res) => {
  try {
 upload.single("images")( req, res, (err)=>{
      if(err) return res.status(400).json({ error: err.message });
    })

    const {
      name,
      lastname,
      sex,
      birthday,
      email,
      phone,
      department,
      departmentKey,
      homeNumber,
      province,
      district,
      subdistrict,
      zipCode,
    } = req.body;


    // const existingEmployee = await prisma.employee.findUnique({
    //   where: { email },
    // });

    // if (existingEmployee) return res.status(400).json({ error: "Email already in use" });

    // const employeeCount = await prisma.employee.count();
    // const id = `AP${String(employeeCount + 1).padStart(4, "0")}`;
    // const password = "polsing";
    // const passwordHash = await bcrypt.hash(password, 11);


    // const newEmployee = await prisma.employee.create({
    //   data: {
    //     id,
    //     name,
    //     lastname,
    //     password: passwordHash,
    //     sex,
    //     birthday: new Date(birthday),
    //     email,
    //     phone,
    //     department,
    //     role: departmentKey,
    //     images: req.file.filename,
    //   },
    // });

    // const newAdress =  await prisma.address.create({
    //   data: {
    //     district,
    //     homeNumber,
    //     province,
    //     subdistrict,
    //     zipCode: parseInt(zipCode, 10),
    //     emp_id: id,
    //   },
    // });

    // if(!newEmployee || !newAdress ) return res.status(400).json({ error: "Create Employee error" });

    res.status(200).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const Employee = async (req, res) => {
  try {
    const empToken = req.cookies._auth;
    if (!empToken) {
      // console.log(empToken);
      return res.status(401).json({ error: "Authorization token not found" });
    }
    // console.log(empToken);
    const decodedToken = jwt.verify(empToken, "APL-PS");
    const empId = decodedToken.emp;

    const employee = await prisma.employee.findUnique({
      where: {
        id: empId,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        sex: true,
        birthday: true,
        email: true,
        phone: true,
        status: true,
        department: true,
        role: true,
        images: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const EmployeeAll = async (req, res) => {
  try {
    const users = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        sex: true,
        birthday: true,
        email: true,
        phone: true,
        status: true,
        department: true,
        role: true,
        images: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const EmployeeID = async (req, res) => {
  try {
    const empId = req.params.id;
    const employee = await prisma.employee.findUnique({
      where: {
        id: empId,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        sex: true,
        birthday: true,
        email: true,
        phone: true,
        // status: true,
        department: true,
        role: true,
        images: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = { Employee, EmployeeAll, CreateEmployee, EmployeeID };
