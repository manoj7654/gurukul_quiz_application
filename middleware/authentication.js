const jwt=require("jsonwebtoken");
require("dotenv");
const authentication=async(req,res,next)=>{
   
        const token=req.headers.authorization;
        if(token){
         const decode=jwt.verify(token,process.env.key)
         if(decode){
            next()
         }else{
            res.json({"message":"Please login again"})
         }
        }else{
            res.json({"message":"Please login first"})
        }
    } 

    module.exports={authentication}