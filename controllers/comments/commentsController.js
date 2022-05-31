const User = require("../../models/userModel");
const Comment = require("../../models/commentModel");
const Post = require("../../models/postModel");
const Notification = require("../../models/notificationModel");

const addComment = async (req, res) => {
  if (!req.body.postId) return res.sendStatus(404)

  const newComment = req.body.comment;
  const commentAuthor = await User.findById(req.id).exec();
  const foundPost = await Post.findById(req.body.postId).exec();
  const postAuthor = await User.findById(foundPost.author).exec();
  if (!commentAuthor) return res.status(400).json('author couldnt find')
  if (!newComment) return res.sendStatus(404);

  const commentObj = {
    comment: newComment,
    postId: req.body.postId,
    author: {
      id: commentAuthor._id,
      username: commentAuthor.username,
      profilePic: commentAuthor.profilePic,
    },
    date: new Date(),
  };

  try {
    const result1 = await Comment.create(commentObj)
    foundPost.comments.unshift(result1._id)
    const result2 = await foundPost.save()
    const notification = await Notification.create({
      userId: foundPost.author,
      notifType: 3,
      opponent: req.username,
      postId: foundPost._id,
      date: new Date(),
    })
    postAuthor.notifications.unshift(notification._id)
    await postAuthor.save()

    res.status(201).json({ result1 });
  } catch (err) {
    res.status(409).json(err);
  }
};

const deleteComment = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  const foundComment = await Comment.findById(req.params.id).exec()
  foundPost = await Post.findById(foundComment.postId)
  if (!foundComment) return res.sendStatus(404)

  if (foundComment.author.id !== req.id) res.sendStatus(406);

  try {
    const i = foundPost.comments.indexOf(foundComment._id)
    foundPost.comments.splice(i, 1)

    foundPost.save()
    const result = await Comment.deleteOne({ _id: req.params.id })

    res.status(200).json(result);

  } catch (e) {
    res.status(409).json(e)
  }

};

const likeComment = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400)
  const foundComment = await Comment.findById(req.params.id).exec()
  if (!foundComment) return res.sendStatus(404)

  if (!foundComment.likes.includes(req.id)) foundComment.likes.unshift(req.id)//add to likes if not already there
  else foundComment.likes = foundComment.likes.filter(id => id !== req.id)//remove from likes if already there
  console.log(foundComment)

  const result = await foundComment.save()
  res.status(200).json(result)
};

//comment reactions

module.exports = { addComment, deleteComment, likeComment }
