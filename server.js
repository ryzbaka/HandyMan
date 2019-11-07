const express=require('express')//import express library
const path=require('path')//import path library for joining paths
const mongoose=require('mongoose')
const app=express()
const bodyParser=require('body-parser')
const Users=require('./models/Users')//schema
require('dotenv/config')

app.use(bodyParser.json())

app.get("/",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"homepage.html"))
})
app.get("/team",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"teampage.html"))
})
app.get("/sign_up",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"sign_up.html"))
})
app.get("/sign_in",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"sign_in.html"))
})
app.get("/playground",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"playground.html"))
})
//Database logic
app.post("/sign_up/send_details",async function(req,res){
    console.log(req.url)
    const user=new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        password:req.body.password
    })
    try{
        const savedUser=await user.save()
        res.json(savedUser)
    }catch(err){
        res.json({message:err})
    }
})
//
app.use(express.static(__dirname+'/public/'))//public data
const port=3001
mongoose.connect(
    process.env.DB_CONNECTION,//environment variable
    {useNewUrlParser:true},
    function(){console.log("connected to db...")}
    )
app.listen(port)

console.log(`listening on port ${port}`)
