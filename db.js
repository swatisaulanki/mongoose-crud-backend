const mongoose = require("mongoose")
require("dotenv").config();  // <-- import dotenv

const connection= mongoose.connect(process.env.MONGO_URL) // <-- use from .env

module.exports={
    connection    
}
