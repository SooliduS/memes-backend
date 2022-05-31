const User = require('../../models/userModel')

const searchUsers = async (req , res) => {
    if(!req.params.username) return res.sendStatu(204) 
    const searchedUsers = await User.find({username:{$regex:new RegExp("^" + req.params.username.toLowerCase(), "i")}}).limit(5).exec() // find users by url params
    if(!searchedUsers) return res.status(404).json({message:'user not found'})

    //return {username , id , profilePic}
    const arr = searchedUsers.map(user => { return {username:user.username , id:user._id , profilePic:user.profilePic  }}) 
    res.status(200).json({arr})
}

module.exports = searchUsers