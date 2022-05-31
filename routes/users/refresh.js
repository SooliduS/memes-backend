const router = require('express').Router()
const handleRefreshToken = require('../../controllers/users/refreshTokenController')

router.get('/' , handleRefreshToken)

module.exports = router