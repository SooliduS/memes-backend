const Notification = require('../../models/notificationModel') 

const getNotifications = async (req , res) => {
    if(!req.id) res.status(401).json({message: 'need to login'})

    const notifications = await Notification.find({userId:req.id}).sort({date:-1})
    res.status(200).json({notifications})
}

module.exports = getNotifications