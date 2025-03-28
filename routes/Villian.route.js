const express = require("express");
const { VillianModel } = require("../models/Villian.model");

const villianRouter = express.Router();

// GET all villains
villianRouter.get("/", async (req, res) => {
    let query = req.query;
    try {
        const villains = await VillianModel.find(query);
        res.send(villains);
    } catch (err) {
        console.log(err);
        res.send({ "err": "Something went wrong" });
    }
});

// ADD a villain
villianRouter.post("/add", async (req, res) => {
    try {
        const data = req.body;
        console.log("Received Data:", data); // Debugging: Log received data
        const villain = new VillianModel(data);
        await villain.save();
        res.send("Added the villain");
    } catch (error) {
        console.error("Error saving villain:", error);
        res.status(500).send("Error adding villain");
    }
});

module.exports = {
    villianRouter
}
