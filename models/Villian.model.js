const mongoose=require("mongoose")


const villianSchema=mongoose.Schema({
    name:String,
    power:Number
})
const VillianModel=mongoose.model("villian",villianSchema)

module.exports={
    VillianModel
}