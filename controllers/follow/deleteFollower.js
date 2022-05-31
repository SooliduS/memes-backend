const User = require('../../models/userModel')

const deleteFollower = async (req , res) => {
    const myUser = await User.findOne ({_id:req.id})
    const foundUser = await User.findOne({_id:req.body.id})

    if(!myUser || !foundUser) return res.status(400).json({message:"something went wrong"})

    try{
        const newFollowers = myUser.followers.filter(user=>user._id != foundUser._id)
        const newFollowings = foundUser.followings.filter(user=>user._id != myUser._id)

        myUser.followers = newFollowers
        foundUser.followings = newFollowings

        await myUser.save()
        await foundUser.save()
        res.sendStatus(200)
    }catch(err){
        res.status(409).json({message:"something went wrong"} , err)
    }
}
module.exports = deleteFollower