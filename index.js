// for making server
const express=require("express");
const { connection } = require("./config/db");
const app=express();


require("dotenv").config();


//listening server
app.listen(process.env.port,async(req,res)=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Getting Error while connecting to db")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})