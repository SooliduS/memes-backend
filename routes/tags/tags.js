const router = require('express').Router()
const {getTags , getAllTags} = require('../../controllers/tags/getTagsController')

router.get('/',getTags)
router.get('/all' , getAllTags)

module.exports=router