const mongoose = require("mongoose")
require("dotenv").config();  // <-- import dotenv

const connection= mongoose.connect(process.env.MONGO_URL) // <-- use from .env

const heroSchema= mongoose.Schema({
    name:String,
    city: String,
    power: Number,
    villian:String,
    language: String,
    is_active:Boolean
})
const HeroModel= mongoose.model("hero",heroSchema)
module.exports={
    connection,
    heroSchema,
    HeroModel
}
