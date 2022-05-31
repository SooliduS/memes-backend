const router = require('express').Router();
const followRequest = require('../../controllers/follow/requestController')
const followAprove = require('../../controllers/follow/aproveController')
const deleteFollower = require('../../controllers/follow/deleteFollower')
const handleUnfollow = require('../../controllers/follow/unfollowController')

router.post('/request' , followRequest)
router.post('/aprove' , followAprove)
router.post('/delete' , deleteFollower)
router.post('/unfollow' , handleUnfollow)

module.exports = router;