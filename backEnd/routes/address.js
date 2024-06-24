var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/provinces", async (req, res) => {
  try {
    const provinces = await prisma.province.findMany({
      select: {
        id: true,
        name_in_thai: true,
      },
    });
    res.status(200).json(provinces);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/districts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const districts = await prisma.district.findMany({
      select: {
        id: true,
        name_in_thai: true,
      },
      where: {
        province_id: parseInt(id),
      },
    });
    res.status(200).json(districts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/subdistricts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subdistricts = await prisma.subdistrict.findMany({
      select: {
        id: true,
        name_in_thai: true,
        zip_code: true,
      },
      where: {
        district_id: parseInt(id),
      },
    });
    res.status(200).json(subdistricts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
