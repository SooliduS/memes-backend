const User = require("../../models/userModel");
const Post = require("../../models/postModel");
const Tag = require("../../models/tagModel")


const getPostsByUser = async (req, res) => {
  if (!req.params.userId) return res.sendStatus(404);
  const page = req.params.page || 1
  try {

    const foundUser = await User.findOne({ _id: req.params.userId }).exec();
    if (!foundUser) return res.status(404).json({ message: "user not found" });

    let userPosts = null;
    if (foundUser.followers.includes(req.id) || foundUser._id == req.id) {

      userPosts = await Post.find({ author: foundUser._id })
        .sort({ dateCreated: -1 }).skip((page - 1) * 20).limit(20).populate('comments').exec();

    } else {
      userPosts = await Post.find({ author: foundUser._id, private: false })
        .sort({ dateCreated: -1 }).skip((page - 1) * 20).limit(20).populate('comments').exec();
    }

    if (userPosts.length === 0)
      return res.status(204).json({ message: `${foundUser.author} has no posts yet` });


    res.status(200).json({ posts: userPosts });
  } catch (e) {
    console.log(e);
  }
};

const getPostsByTag = async (req, res) => {
  if (!req?.params?.tag) return res.sendStatus(404);
  const tag = req.params.tag.toLowerCase();
  const page = req.params.page || 1;
  const myUser = await User.findById(req.id).exec()

  const foundPosts = await Tag.findOne({ tagName: tag })
    .populate({
      path: 'posts',
      model: 'Post',
      populate: {
        path: 'comments',
        model: 'Comment'
      }
    }).select('posts')
    .sort({ dateCreated: -1 }).skip((page - 1) * 20).limit(20).exec();



  if (!foundPosts)
    return res.status(204).json({ message: "no post founds with certain tag" });

  const allowedPosts = foundPosts.posts.filter(
    post => post.private === false || myUser?.followings?.includes(post.author) || post.author == req.id)


  res.status(200).json({ posts: [...allowedPosts] });
};

const getPostById = async (req, res) => {
  if (!req.params.postId) return res.sendStatus(400);

  const postId = req.body.postId || req.params.postId;
  const foundPost = await Post.findById(postId).populate('comments').exec();
  const myUser = await User.findById(req.id);

  if (!foundPost) return res.status(404).json({ message: "post not found" });

  if (foundPost.private === true && !myUser?.followings.includes(foundPost.author) && myUser?._id != foundPost.author) return res.status(403).json({ message: "private post" });

  //response
  res.status(200).json({post:foundPost});
};

const getPublicPosts = async (req, res) => {

  const myUser = await User.findOne({ _id: req.id }).exec() || null
  const page = req.params.page || 1;

  const posts = await Post.find({
    dateCreated: {
      $gt: new Date(-1000 * 60 * 60 * 12 * 24 * 30)
    }
  }).skip((page - 1) * 10)
    //.sort({ likes: -1 })
    .sort({ dateCreated: -1 })
    .limit(10).populate('comments').exec();
  if (myUser) {
    const allowedPosts = posts.filter(post => post.private === false || myUser.followings.includes(post.author) || req.id == post.author)
      .sort(() => Math.random() - 0.5)

    return res.status(200).json({ posts: allowedPosts })
  }
  const allowedPosts = posts.filter(post => post.private === false)
  res.status(200).json({ posts: allowedPosts })

}

const getPostsByFollowings = async (req, res) => {

  if (!req.id) return res.sendStatus(401)

  const myUser = await User.findOne({ _id: req.id }).exec()

  const page = req.params.page || 1;

  if (!myUser.followings || myUser.followings.length === 0) return res.sendStatus(204)

  const conditions = []
  myUser.followings.map(id => conditions.unshift({ author: id }))

  const posts = await Post.find({ $or: conditions })
    .sort({ dateCreated: -1 }).skip((page - 1) * 20).limit(20).exec();

  res.status(200).json({ posts: posts })


}

const getHotPosts = async (req, res) => {

  const page = req.params.page || 1
  const myUser = await User.findById(req?.id)

  const posts = await Post.find({dateCreated:{$gt:new Date(-1000 * 60 * 60 * 24 * 7)} })
    .sort({ likes: -1 })
    .skip((page - 1) * 10)
    .limit(10).populate('comments').exec();

    const allowedPosts = posts.filter(post => post.private === false || myUser?.followings?.includes(post.author))

    res.status(200).json({posts:allowedPosts})
}

module.exports = { getPostsByUser, getPostsByTag, getPostById, getPublicPosts, getPostsByFollowings , getHotPosts };
