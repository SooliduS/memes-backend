const router = require('express').Router()
const usersCrudController=require('../../controllers/users/usersCrudController')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')
const searchUsers = require('../../controllers/users/searchUsersController')
const updateUser = require('../../controllers/users/updateProfileController')

router.route('/')
.get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersCrudController.getUser)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersCrudController.createUser)
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersCrudController.updateUser)
.delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersCrudController.deleteUser)

router.get('/all', verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor) , usersCrudController.getAllUsers)

router.get('/search/:username' , searchUsers )

router.get('/adminsearch/:id' , usersCrudController.getUser)

router.get('/:username' , usersCrudController.getUserToUsers)

router.put('/editprofile/:userId' , updateUser)

module.exports = router;