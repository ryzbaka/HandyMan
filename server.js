const express=require('express')//import express library
const path=require('path')//import path library for joining paths

app=express()

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
app.use(express.static(__dirname+'/public/'))//public data
const port=3001
app.listen(port)
console.log(`listening on port ${port}`)
