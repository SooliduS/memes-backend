const Post = require('../../models/postModel')

const updatePost = async (req , res) => {
    if(!req.params.postId) return res.sendStatus(400)

    const foundPost = await Post.findById(req.params.postId)

    if(!foundPost) return res.status(404).json({message:"post not found"})

    if (foundPost.author !==req.id) return res.sendStatus(403)

    const newTitle = req.body.title || foundPost.title
    const newCaption = req.body.caption || foundPost.caption
    const newTags = req.body.tags || foundPost.tags
    const newPrivate = req.body.private || foundPost.private

    foundPost.title = newTitle
    foundPost.caption = newCaption
    foundPost.tags = newTags
    foundPost.private = newPrivate
    foundPost.dateEdited = new Date()

    const result = await foundPost.save()
    res.status(200).json(result)
}

module.exports = updatePost