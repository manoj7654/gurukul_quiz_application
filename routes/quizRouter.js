// for creating quiz routes
const express=require("express");
const quizRouter=express.Router()

const {create,getActiveQuiz,allQuiz,getActiveQuizById}=require("../controllers/quizController");

// middleware for authentication
const { authentication } = require("../middleware/authentication");

// create quiz
quizRouter.post("/",authentication,create)

// get active quiz
quizRouter.get("/active",authentication,getActiveQuiz)


//get all quiz
quizRouter.get("/all",authentication,allQuiz)


//get particular active quiz
quizRouter.get("/:id",authentication,getActiveQuizById)


module.exports={quizRouter}