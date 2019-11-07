const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('Users',UserSchema)