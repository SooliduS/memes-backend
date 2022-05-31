const Notification = require('../../models/notificationModel')

const updateNotificationsVisited = async (req, res) => {
    if (!req.id) return res.sendStatus(401)
    const notifs = await Notification.find({ userId: req.id, visited: false }).exec()
    try {
        for (const notif of notifs) {
            notif.visited = true
            await notif.save()
        }
    } catch (err) {
        console.error(err)
    }
    res.sendStatus(200)


}

module.exports = updateNotificationsVisited