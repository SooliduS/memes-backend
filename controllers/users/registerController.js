const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const registerUser= async (req,res) => {
    if(!req.body.username || !req.body.password || !req.body.email|| !req.body.firstname || !req.body.lastname){
        return res.status(400).json({message:"username , password , email , firstname and lastname required"})
    }
    const foundUser = await User.findOne({username:req.body.username}).exec()
    if(foundUser){
        return res.status(409).json({message:"Username Already Exists"})
    }
    const hashedPwd = await bcrypt.hash(req.body.password,10)
    try{
        User.create({...req.body, password:hashedPwd,roles:{"user":1373}})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
    res.status(201).json({...req.body, password:hashedPwd,roles:{"user":1373}})
    
}

module.exports =registerUser
