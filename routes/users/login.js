const router = require('express').Router()
const loginUser = require('../../controllers/users/loginController')


router.post('/', loginUser)

module.exports = router