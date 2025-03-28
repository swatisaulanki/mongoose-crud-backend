const express = require("express");
const { HeroModel } = require("../models/Hero.model");

const heroRouter = express.Router();

// GET all heroes
heroRouter.get("/", async (req, res) => {
    let query = req.query;
    try {
        const heroes = await HeroModel.find(query);
        res.send(heroes);
    } catch (err) {
        console.log(err);
        res.send({ "err": "something went wrong" });
    }
});

// ADD hero
heroRouter.post("/add", async (req, res) => {
    try {
        const data = req.body;
        const hero = new HeroModel(data);
        await hero.save();
        res.send("Added the hero");
    } catch (error) {
        console.error("Error saving hero:", error);
        res.status(500).send("Error adding hero");
    }
});

// UPDATE hero
heroRouter.patch("/edit/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        await HeroModel.findByIdAndUpdate({ _id: ID }, payload);
        res.send(`Updated the hero data whose id is ${ID}`);
    } catch (err) {
        console.log(err);
        res.send({ "err": "Something went wrong" });
    }
});

// DELETE hero
heroRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await HeroModel.findByIdAndDelete({ _id: ID });
        res.send(`Deleted the hero data whose id is ${ID}`);
    } catch (err) {
        console.log(err);
        res.send({ "err": "Something went wrong" });
    }
});

module.exports = {
    heroRouter
};
