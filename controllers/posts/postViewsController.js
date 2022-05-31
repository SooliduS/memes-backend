const Post = require('../../models/postModel')

const viewController = async (req , res) => {
    if(!req.body.posts) res.sendStatus(204)

    let foundPost = {}
    for(let i=0 ; i<req.body.posts.length ; i++) {
        foundPost = await Post.findById(req.body.posts[i]).exec()
        foundPost.views +=1
    }
    res.sendStatus(200)
}
module.exports = viewController()