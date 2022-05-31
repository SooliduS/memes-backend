const router = require('express').Router()
const getProfile = require('../../controllers/users/getProfileController')

router.get('/' , getProfile)

module.exports = router