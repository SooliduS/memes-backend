const router = require('express').Router()
const logoutUser = require('../../controllers/users/logoutController')

router.get('/',logoutUser)

module.exports=router