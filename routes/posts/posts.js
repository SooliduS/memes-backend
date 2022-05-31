const router = require('express').Router()
const searchPosts = require('../../controllers/posts/searchPostsController')
const {getPostsByTag , getPostsByUser , getPostById ,getPostsByFollowings , getHotPosts } = require('../../controllers/posts/getPostsController')
const updatePost = require('../../controllers/posts/updatePostController')
const {likePost , dislikePost } = require('../../controllers/posts/postLikesController')
const tagImpressions = require('../../middleware/tagImpressions')

router.post('/search' , searchPosts)
router.get('/search/:query/:page', searchPosts)
router.get('/search/:query', searchPosts)
router.get('/tag/:tag/:page' , tagImpressions , getPostsByTag)
router.get('/tag/:tag' , tagImpressions , getPostsByTag)
router.get('/post/:postId' , getPostById)
router.put('/post/:postId', updatePost)
router.get('/like/:id' , likePost)
router.get('/dislike/:id' , dislikePost)
router.get('/followings/:page' , getPostsByFollowings)
router.get('/followings' , getPostsByFollowings)
router.get('/hot/:page' , getHotPosts)
router.get('/hot' , getHotPosts)
router.get('/:userId/:page',getPostsByUser)
router.get('/:userId',getPostsByUser)

module.exports = router
