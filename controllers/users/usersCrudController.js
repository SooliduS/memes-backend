const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find().exec();
  res.json(allUsers);
};

const createUser = async (req, res) => {
  if (!req?.body?.username || !req.body.password || !req.body.email)
    return res.status(400).json("username , password and email required");
  const hashedpwd = await bcrypt.hash(req.body.password,10);
  const newUser = {
    username: req.body.username,
    password: hashedpwd,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    roles: req.body.roles
  };
  try {
    const result = await User.create(newUser);
    res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  if (!req.body.username && !req.body.id)
    return res.status(400).json({message: "Username or ID needed"});
  if (req.body.username) {
    const foundUser = await User.findOne({
      username: req.body.username,
    }).exec();
    if (!foundUser) return res.status(404).json({message: "User not found"});
    if (req.body.newUsername) {
      const checkUsername = await User.findOne({
        username: req.body.newUsername,
      });
      if (checkUsername) {
        return res.status(409).json({message:"Username Already Exists"});
      }
      foundUser.username = req.body.newUsername;
    }
    if (req.body.newEmail) {
      const checkEmail = await User.findOne({ email: req.body.newEmail });
      if (checkEmail) {
        return res.status(409).json({message:"Email Already Exists"});
      }
      foundUser.email = req.body.newEmail;
    }
    if (req.body.newFirstname) {
      foundUser.firstname = req.body.newFirstname;
    }
    if (req.body.newLastname) {
      foundUser.lastname = req.body.newLastname;
    }
    if(req.body.roles){
      foundUser.roles={...req.body.roles}
    }
    try{ const result = await foundUser.save();
      res.json(result);
    }catch(err){
      console.log(err)
    }
   
  } else {
    const foundUser = await User.findOne({ _id: req.body.id }).exec();
    if (!foundUser) return res.status(404).json({message:"User not found"});
    if (req.newUsername) {
      foundUser.username = req.body.newUsername;
    }
    if (req.newEmail) {
      foundUser.email = req.body.newEmail;
    }
    if (req.newFirstname) {
      foundUser.firstname = req.body.newFirstname;
    }
    if (req.newLastname) {
      foundUser.lastname = req.body.newLastname;
    }
    if(req.body.roles){
      foundUser.roles={...req.body.roles}
    }

    try{ const result = await foundUser.save();
      res.json(result);
    }catch(err){
      console.log(err)
    }
  }
};

const getUser = async (req, res) => {
   const userId = req.params.id
   try{
    const foundUser = await User.findOne({_id: userId}).exec()
    if(!foundUser) return res.status(404).json({message:"User not found"})
    res.status(200).json(foundUser)
   }catch(err){
    res.status(404).json({message:"User not found"})
   }
  
};

const getUserToUsers = async (req, res) => {
  try{
    const foundUser = await User.findOne({username:{$regex:new RegExp("^" + req.params.username.toLowerCase(), "i")}}).exec()
    if(!foundUser) return res.status(404).json({message:"User not found"})
    res.status(200).json({
      id:foundUser._id,
      username:foundUser.username,
      profilePic:foundUser.profilePic,
      bio:foundUser.bio,
    })
  }catch(err){
    res.status(404).json({message:"User not found"})
  }
  
};

const deleteUser = async (req, res) => {
    const foundUser = await User.findOne({ username: req.body.username})
    if(!foundUser) return res.status(404).json({message:"User not found"});
    try {const result = await User.deleteOne(foundUser)
      res.status(200).json(result)
    }catch(err) {
      console.log(err)
    }
    
}

module.exports = {getAllUsers , createUser , updateUser , deleteUser , getUser , getUserToUsers}