const User = require('../../models/userModel')
const bcrypt = require('bcrypt')

const updateUser = async (req , res) => {
    if(!req.params.userId) return res.sendStatus(400)

    const foundUser = await User.findById(req.params.userId).exec()

    if(!foundUser) return res.status(404).json({message: 'User not found'})

    if (foundUser._id != req.id) return res.sendStatus(403)

    const newPassword = req.body.password ? await bcrypt.hash(req.body.password,10) : foundUser.password
    const newEmail = req.body.email || foundUser.email
    const newProfilePic = req.body.profilePic || foundUser.profilePic || null
    const newBio = req.body.bio || foundUser.bio || null

    foundUser.password = newPassword
    foundUser.email = newEmail
    foundUser.profilePic = newProfilePic
    foundUser.bio = newBio

    const result = await foundUser.save()
    res.status(200).json(result)
}

module.exports = updateUser