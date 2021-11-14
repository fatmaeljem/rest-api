let express=require('express');
const connectDB = require('./config/connectDB');
const User = require('./models/user');
let app=express()
require('dotenv').config({ path: './config/.env' })
connectDB()
let PORT=process.env.PORT||666;

//
app.use(express.json())

//add new user
app.post('/user/post',async(req,res)=>{
    let {name,email,phone}=req.body
    try {
        let newUser=new User({
            name,email,phone
        })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.log(error.message)
    }
})

// delete a user
app.delete('/user/delete/:id',async(req,res)=>{
    try {
    let deleteUser= await User.findByIdAndDelete(req.params.id)
    res.send("user is deleted")
    } catch (error) {
        console.log(error.message)
    }
})

//get users
app.get('/user/get',async(req,res)=>{
    try {
    let users= await User.find()
    res.send(users)
    } catch (error) {
       console.log(error.message)
    }
})

//get one user
app.get('/user/get/:id',async(req,res)=>{
    try {
    let oneUser= await User.findById(req.params.id)
    res.send(oneUser)
    } catch (error) {
        console.log(error.message)
    }
})

//edit a user
app.put('/user/edit/:id',async(req,res)=>{
    try {
    let editedUser= await User.findByIdAndUpdate(req.params.id,{...req.body})
    res.send(editedUser)
    } catch (error) {
        console.log(error.message)
    }
})

//start server
app.listen(PORT,(err)=>
err?console.log(err):console.log("server is started"))