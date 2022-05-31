const router = require('express').Router()
const registerUser = require('../../controllers/users/registerController')


router.post('/', registerUser)

module.exports = router