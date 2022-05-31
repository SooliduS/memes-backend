const Post = require("../../models/postModel");
const User = require("../../models/userModel");

const searchPosts = async (req, res) => {
  const query = req.params.query || req.body.query
  const page = parseInt(req.params.page, 10) || 1;
  const myUser = await User.findById(req.id)

  
  if (!query)
    return res.status(201).json({ message: "nothing searched" });
  try {

    //finding posts
    const foundPosts = await Post.find({
      $or: [
        {
          title: { $regex: new RegExp(query) },
          private: false,
        },
        {
          caption: { $regex: new RegExp(query) },
          private: false,
        },
      ],
    }).skip((page-1)*20).limit(20).populate('comments').exec();

    //remove private posts if not follows
    const allowedPosts = foundPosts.filter(post => post.private===false || myUser.followings.includes(post.author))

    res.status(200).json(allowedPosts);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};
module.exports = searchPosts;
