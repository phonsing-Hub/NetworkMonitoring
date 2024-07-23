const express = require("express");
const router = express.Router();
const { db } = require("../db");

router.get("/location/all", async (req, res) => {
    try {
      const location = await db
        .select('id', 'latitude', 'longitude')
        .from("Hosts");
      res.status(200).json( location );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//router.get("/localtion/:id", async (req, res) => {});

module.exports = router;
