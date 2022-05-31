const User = require('../../models/userModel')

const logoutUser = async (req, res) =>{
    // on client also delete the access token

    const refreshToken = req.cookies.jwt
    if(!refreshToken) return res.status(204)
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser)  {
        res.clearCookie('jwt' , {httpOnly: true , sameSite:'none',secure:true }) //secure:true
        return res.sendStatus(204)
    }
    foundUser.refreshToken=''
    const result = await foundUser.save()
    res.clearCookie('jwt' , {httpOnly: true , sameSite:'none',secure:true }) //secure:true
    return res.sendStatus(204)

}

module.exports = logoutUser