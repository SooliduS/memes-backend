const User = require('../../models/userModel')

const hanadleUnfollow = async (req , res ) => {

    const myUser = await User.findOne({_id:req.id}).exec()
    const foundUser = await User.findOne({_id:req.body.id}).exec()

    if(!myUser || !foundUser) return res.status(400).json({message:"something went wrong"})

    try {
        myUser.followings.filter((user)=>user._id != foundUser._id)
        foundUser.followers.filter((user)=>user._id != myUser._id)
        await myUser.save()
        await foundUser.save()
        res.sendStatus(200)
    }catch(err) {
        res.status(409).json({message:err.message})
    }

}
module.exports = hanadleUnfollow