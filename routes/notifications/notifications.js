const router = require('express').Router();
const getNotifications = require('../../controllers/notifications/getNotificationsController')
const updateNotifications = require('../../controllers/notifications/updateNotificationsController')


router.get('/updatevisited' , updateNotifications)
router.get('/' , getNotifications)


module.exports = router