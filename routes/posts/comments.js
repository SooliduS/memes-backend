const commentController = require('../../controllers/comments/commentsController')
const router = require('express').Router();

router.post('/', commentController.addComment )
router.delete('/:id', commentController.deleteComment)
router.get('/like/:id' , commentController.likeComment)

module.exports = router