const express = require("express");
const { connection, HeroModel} = require("./db"); // Ensure db.js exports a connection promise
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome");
});

app.get("/heroes", async (req, res) => {
    const heroes = await HeroModel.find()
    res.send(heroes);
});

app.patch("/edithero/:id",async(req,res)=>{
    const ID=req.params.id
    const payload=req.body
    try{
        await HeroModel.findByIdAndUpdate({_id:ID},payload)
        res.send(`upadate the hero data whoe id is ${ID}`)
    
    
    } catch(err){
        console.log(err)
        res.send({"err":"Something wend wrong"})
    }
})
app.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    try{
        await HeroModel.findByIdAndDelete({_id:ID})
        res.send(`Deleted the hero data whose id is ${ID}`)
    
    
    } catch(err){
        console.log(err)
        res.send({"err":"Something wend wrong"})
    }
})
app.post("/addhero", async (req, res) => {
    try {
        const data = req.body;
        console.log("Received Data:", data); // Debugging: Log received data
        const hero = new HeroModel(data);
        await hero.save();
        res.send("Added the hero");
    } catch (error) {
        console.error("Error saving hero:", error); // Debugging: Log errors
        res.status(500).send("Error adding hero");
    }
});



app.listen(4500, async () => {
    try {
        await connection;  // Ensure the connection is awaited properly
        console.log("Connected to the database successfully");
        console.log("Server is running on port 4500");
    } catch (err) {
        console.log("Error while connecting to DB");
        console.log(err);
    }
});
