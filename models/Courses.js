const mongoose=require('mongoose')

const CoursesSchema=mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    progress:{
        type:Number,
        default:1
    }
})

module.exports=mongoose.model('Courses',CoursesSchema)