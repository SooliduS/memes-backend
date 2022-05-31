const User = require('../../models/userModel')
const Notification = require('../../models/notificationModel')

const followRequest = async (req, res) => {
    if (!req.body.id) return res.status(400).json({ message: 'id of requested user required' })//id of the taking user(not progressing user)
    const foundUser = await User.findOne({ _id: req.body.id }).exec()//user that takes the follow request (not progressing user)
    if (!foundUser) return res.status(404).json({ message: "user not found" })
    const myUser = await User.findOne({ _id: req.id }).exec()//user that makes the follow request (progressing user)
    if (!myUser) return res.status(401)//unauthorized

    if (foundUser._id === myUser._id) return res.status(403).json({ message: "can't request to yourself" })

    if (foundUser.requestsGot.includes(req.id)) return res.status(400).json({ message: "Request already sent" })

    //adding the follow request to both of users
    try {
        foundUser.requestsGot.unshift(myUser._id)
        myUser.requestsSent.unshift(foundUser._id)
        await myUser.save()
        //foundUser.notifications.unshift(notification._id)
        await foundUser.save()
        const notification = await Notification.create({
            userId: foundUser._id,
            notifType: 1,
            opponent: req.username,
            opponentId: myUser._id,
            date: new Date()
    
        })
    
        res.status(200).json({ message: 'request sent' })
    } catch (err) {
        return res.status(409).json({ message: err.message })
    }
  
}
module.exports = followRequest