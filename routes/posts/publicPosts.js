const {getPublicPosts } = require('../../controllers/posts/getPostsController');
const router = require('express').Router()

router.get('/:page' , getPublicPosts)
router.get('/' , getPublicPosts)

module.exports = router