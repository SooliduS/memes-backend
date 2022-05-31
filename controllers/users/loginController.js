const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken")

//handle user login
const loginUser = async (req, res) => {

    //request conditions
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message:'username and password needed'})
    }
    const foundUser = await User.findOne({username: req.body.username}).exec()
    if(!foundUser) return res.status(404).json({message:'user not found'})
    const matchedPassword = await bcrypt.compare(req.body.password, foundUser.password)
    if(!matchedPassword){
        return res.status(401).json({message:"Invalid username or password"})
    }

    //creating access token and refresh token
    const accessRoles = Object.values(foundUser.roles).filter(Boolean)
    const accessToken= jwt.sign(
        {
            userInfo:{
                id:foundUser._id,
                username:foundUser.username,
                roles:accessRoles
            }
        },
        process.env.ACCESS_TOKEN,
        {expiresIn:'1m'}
        )
    const refreshToken = jwt.sign(
        {
            username:foundUser.username
        },
        process.env.REFRESH_TOKEN,
        {expiresIn:'60m'}
    )
    //saving refresh token with current user
    foundUser.refreshToken=refreshToken
    await foundUser.save()

    //sending refresh token to client cookies
    res.cookie('jwt',refreshToken,{ httpOnly: true, sameSite: 'None', maxAge: 60 * 60 * 1000 ,secure:true }) // secure:true

    //sending access token to frontend
    res.json({accessToken , username:foundUser.username , roles:accessRoles , id:foundUser._id , profilePic:foundUser.profilePic})

}

module.exports = loginUser