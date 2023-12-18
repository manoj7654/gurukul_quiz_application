//importing userModal for register and login
const {userModal}=require("../modals/userModal");

// for creating jwt token
const jwt=require("jsonwebtoken");

// for hashing password
const bcrypt=require("bcrypt");

//for getting evironment variable
require("dotenv").config();


// for user registration
const register=async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        const user=await userModal.findOne({email})
        if(user){
            return res.json({"message":"Email already exist"})
        }
       bcrypt.hash(password,5,async(err,secure_password)=>{
        if(err){
            res.json(err.message)
        }else{
            const result=await userModal({name,email,password:secure_password});
            result.save();
            res.status(200).json({"message":"User Register Successfully"})
        }
       })
    } catch (error) {
        res.status(404).json({"message":"Unable to register"})
    }
}

// for user login
const login=async(req,res)=>{
    const {email,password}=req.body;
     
    try {
        const user=await userModal.find({email});
        if(user.length>0){
          bcrypt.compare(password,user[0].password,async(err,result)=>{
            if(result){
            const token=jwt.sign({userId:user[0]._id},process.env.key)
            res.status(200).json({"message":"Login Successfully","token":token})
            }else{
                res.status(400).json({"message":"Wrong credential"})
            }
          })
        }else{
            res.status(400).json({"message":"Wrong credential"})
        }
    } catch (error) {
        res.status(404).json({"message":"Unable to login"})
    }
}

// exporting register,login
module.exports={register,login}