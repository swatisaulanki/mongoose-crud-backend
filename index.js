const express = require("express");
const { connection } = require("./db");
const { heroRouter } = require("./routes/Hero.route");
const { villianRouter } = require("./routes/Villian.route");

require('dotenv').config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome");
});

// routes
app.use("/heroes", heroRouter);
app.use("/villians", villianRouter);

//Listen on port
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the database successfully");
        console.log(`Server is running on port ${process.env.port}`);
    } catch (err) {
        console.log("Error while connecting to DB");
        console.log(err);
    }
});
