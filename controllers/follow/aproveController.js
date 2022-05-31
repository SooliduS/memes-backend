const User = require('../../models/userModel')
const Notification = require('../../models/notificationModel')

const followAprove = async (req , res) => {
    if (!req.body.id) return res.sendStatus(400)//id of the user who sent the follow request (not progressing user)
    const foundUser = await User.findOne({_id:req.body.id}).exec()//user who sent the follow request (not progressing user)
    if(!foundUser) return res.sendStatus(409)
    const myUser = await User.findOne({_id:req.id}).exec()//user who trying to aprove the follow request (progressing user)
    const myUserNotif = await Notification.findOne({aproved:false , userId:myUser._id , opponentId:foundUser._id}).exec()


    if(!myUser) return res.sendStatus(401)//unauthorized

    const isFoundUserInMyRequestList = myUser.requestsGot.includes(foundUser._id)
    const amIinFoundUsersRequestList = foundUser.requestsSent.includes(myUser._id)

    if(!isFoundUserInMyRequestList || !amIinFoundUsersRequestList) return res.sendStatus(400)

    try{
        //adding to followers and following list
        foundUser.followings.unshift(myUser._id) 
        myUser.followers.unshift(foundUser._id)

        //removing from request list
        foundUser.requestsSent = foundUser.requestsSent.filter(request => request != myUser._id.valueOf())
        myUser.requestsGot = myUser.requestsGot.filter(request => request != foundUser._id.valueOf())
        myUserNotif.aproved = true
        await foundUser.save()
        await myUser.save()
        await myUserNotif.save()

        res.sendStatus(202)
    }catch(err){
        res.status(409).json({message: err.message})
    }
}
module.exports = followAprove