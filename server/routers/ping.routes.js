const express = require("express");
const router = express.Router();
const ping = require("ping");
const { db } = require("../db"); //knex.js

router.get("/ping-multiple", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const hosts = await db.select("*").from("Hosts");
    const sendPingResults = async () => {
      const results = await Promise.all(
        hosts.map(async (host) => {
          const result = await ping.promise.probe(host.ip);
          return {
            id: host.id,
            name: host.name,
            ip: result.host,
            status: result.alive ? "Up" : "Down",
            time: result.time,
            message: result.output,
            points: host.points
          };
        }) 
      );

      res.write(`data: ${JSON.stringify(results)}\n\n`);
    };
    await sendPingResults();
    const interval = setInterval(sendPingResults, 10000);
    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error pinging hosts", error: error.message });
  }
});

router.get("/getHosts", async (req, res) => {
  try {
    const hosts = await db.select("*").from("Hosts");
    res.status(200).json({ hosts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching hosts", error: error.message });
  }
});

router.get("/getHost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const host = await db("Hosts").where({ id: id }).first();

    if (host) res.status(200).json({ host });
    else res.status(404).json({ message: "Host not found" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching host", error: error.message });
  }
});

router.post("/createHost", async (req, res) => {
  try {
    const { name, ip, latitude, longitude, status, points, details } = req.body;
    if (!name || !ip)
      return res
        .status(401)
        .json({ message: "Name and IP must not be empty." });

    const check = await db("Hosts")
      .count("* as count")
      .where("name", name)
      .orWhere("ip", ip)
      .first();

    if (check.count > 0)
      return res
        .status(401)
        .json({
          message: "The host with the specified name or IP already exists",
        });

    const createId = await db("Hosts").count("* as count").first();
    let id = "GW" + String(createId.count + 1).padStart(4, "0");
    
    const result = await db("Hosts").insert({
      id,
      name,
      ip,
      latitude,
      longitude,
      status,
      points,
      details,
    });

    if (result)
      return res.status(201).json({ message: "Host created successfully." });
    else return res.status(401).json({ message: "Failed to create host." });
  } catch (error) {
    //console.log(error)
    res
      .status(500)
      .json({ message: "Error creating host", error: error.message });
  }
});

router.put("/updateHost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ip, latitude, longitude, status, points, details } = req.body;

    if (!name || !ip)
      return res
        .status(401)
        .json({ message: "Name and IP must not be empty." });

    const result = await db("Hosts").where({ id: id }).update({
      name,
      ip,
      latitude,
      longitude,
      status,
      points,
      details,
    });

    if (result)
      return res.status(200).json({ message: "Host updated successfully." });
    else return res.status(404).json({ message: "Host not found." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating host", error: error.message });
  }
});

router.patch("/updateHost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ip, latitude, longitude, points, status } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (ip) updateFields.ip = ip;
    if (latitude) updateFields.latitude = latitude;
    if (longitude) updateFields.longitude = longitude;
    if (points) updateFields.points = points;
    if (status) updateFields.status = status;
    if (Object.keys(updateFields).length === 0)
      return res.status(400).json({ message: "No fields to update" });

    const result = await db("Hosts").where({ id: id }).update(updateFields);

    if (result)
      return res.status(200).json({ message: "Host updated successfully." });
    else return res.status(404).json({ message: "Host not found." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating host", error: error.message });
  }
});

router.delete("/deleteHost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db("Hosts").where({ id: id }).del();
    if (result)
      return res.status(200).json({ message: "Host deleted successfully." });
    else return res.status(404).json({ message: "Host not found." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting host", error: error.message });
  }
});
module.exports = router;
