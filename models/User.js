let mongoose=require('mongoose')
let Schema=mongoose.Schema

//create a user model
let userSchema=new Schema({
    name: String,
    email: String,
    phone: String,
});
module.exports=mongoose.model("User",userSchema)
