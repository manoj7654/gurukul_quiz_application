// for making quiz schema
const mongoose=require("mongoose");


//quiz schema
const quizSchem=mongoose.Schema({
    question:String,
    option:[String],
    rightAnswer:String,
    startDate:Date,
    endDate:Date
},{
    versionKey:false
})

// quiz model
const quizModal=mongoose.model("quiz",quizSchem)

// exporting quizmodel
module.exports={quizModal}