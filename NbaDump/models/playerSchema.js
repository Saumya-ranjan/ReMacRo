const mongoose = require("mongoose")

const playerSchema = 
mongoose.Schema({
  _id:{type:Number, required:true},
  teamId:{type:Number, required:true},                             
  firstName: {type: String,required: true },              
  lastName: {type: String,required: true },          
  position:{type:String, required:true},          
  dateOfBirth:{type:String, required:true},          
  teamName:{type:String, required:true },              
  teamCountry:{type:String},          
})

module.exports = mongoose.model("Players", playerSchema)