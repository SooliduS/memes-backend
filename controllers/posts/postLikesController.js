const Post = require('../../models/postModel')
const User = require('../../models/userModel')
const Notification = require('../../models/notificationModel')

const likePost = async (req, res) => {

  if (!req.params.id) return res.status(400).json({ message: "missing post id" })
  try {
    const foundPost = await Post.findOne({ _id: req.params.id }).exec()
    if (!foundPost) return res.status(404).json({ message: "post not found" })

    const postAuthor = await User.findById(foundPost.author).exec()

    if (foundPost.likes.includes(req.id)) return;
    foundPost.likes.unshift(req.id)

    const result = await foundPost.save()

    res.sendStatus(200)

    const notification = await Notification.create({
      userId: foundPost.author,
      notifType: 2,
      opponent: req.username,
      postId: foundPost._id,
      date: new Date()
    })

    postAuthor.notifications.unshift(notification._id)
    await postAuthor.save()

  } catch (e) {
    console.log(e)
  }

}

const dislikePost = async (req, res) => {

  if (!req.params.id) return res.status(400).json({ message: "missing post id" })
  try {
    const foundPost = await Post.findOne({ _id: req.params.id }).exec()
    if (!foundPost) return res.status(404).json({ message: "post not found" })

    if (!foundPost.likes.includes(req.id)) return
    foundPost.likes = foundPost.likes.filter(id => id != req.id)//remove from likes if already there

    const result = await foundPost.save()



    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  }


}


module.exports = { likePost, dislikePost }