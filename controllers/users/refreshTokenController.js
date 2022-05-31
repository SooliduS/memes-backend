const jwt = require('jsonwebtoken');
const User = require('../../models/userModel')

//handle refresh token verfication
const handleRefreshToken = async (req , res) => {

    //getting refreshtoken from cookies
    const refreshToken = req?.cookies?.jwt
    if(!refreshToken) return res.sendStatus(401)
    //finding user with refresh refreshToken
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser) return res.status(403).json({message: 'User Not found'})
    //verifying refreshToken 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err , decoded) => {
            if (err || foundUser.username !== decoded.username) return res.status(403).json({message:'jwt verify failed'})
            //create and send accessToken if refreshToken verified
            const accessRoles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        id: foundUser._id,
                        username:decoded.username,
                        roles: accessRoles
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '30s' }
            );
            res.status(200).json({ accessToken , username:foundUser.username , roles:accessRoles ,id:foundUser._id , profilePic:foundUser.profilePic})
        }
    )
}
module.exports = handleRefreshToken 