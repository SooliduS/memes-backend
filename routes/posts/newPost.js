const router = require('express').Router();
const addPost = require('../../controllers/posts/addPostController')

router.post('/', addPost)

module.exports = router