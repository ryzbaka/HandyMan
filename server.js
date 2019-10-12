const express=require('express')
const path=require('path')

app=express()

app.get("/",function(req,res){
    console.log(req.url)
    res.sendFile(path.join(__dirname,"homepage.html"))
})
app.use(express.static(__dirname+'/public/'))
const port=5000
app.listen(port)
console.log(`listening on port ${port}`)