// for making server
const express=require("express");
const app=express();

// connection 
const { connection } = require("./config/db");

// router for users
const { userRouter } = require("./routes/userRouter");

// router for quizes
const { quizRouter } = require("./routes/quizRouter");
const { limiter } = require("./rateLimiter");

// for getting invironment variale
require("dotenv").config();

const {scheduler}=require("./job/quizJob")

// middleware
app.use(express.json());


// for rate limiter
app.use(limiter)

// job schedule for status
scheduler();
// for users
app.use("/user",userRouter)

// for quiz
app.use("/quizzes",quizRouter)

//listening server
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Getting Error while connecting to db")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})