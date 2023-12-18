// for creating quiz routes
const express=require("express");
const quizRouter=express.Router()

const {create}=require("../controllers/quizController")

// create quiz
quizRouter.post("/create",create)



module.exports={quizRouter}