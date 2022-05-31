const Post = require("../../models/postModel");
const User = require("../../models/userModel");
const Tag = require("../../models/tagModel");

const POST_TYPE_LIST = require("../../config/postTypeList");

const addPost = async (req, res) => {
  //For now it's just for text postType
  if (req.body.postType && !POST_TYPE_LIST.includes(req.body.postType))
    return res.status(400).json({ message: "post type not found" });

  //finding author
  const author = await User.findOne({ _id: req.id }).exec();
  const authorId = author._id;
  const authorUserName = author.username;
  const authorProfilePic = author.profilePic || ''
  const tagsLowerCased = req.body.tags? req.body.tags.map(tag=>tag.toLowerCase()) :null;

  //creating post
  try {
    const result = await Post.create({
      ...req.body,
      author:authorId , //string
      authorName:authorUserName, //string
      authorPic:authorProfilePic,
      dateCreated: new Date(),
    });
    if(!author.posts){
      author.posts=[]
    }
    author.posts.unshift(result._id)
    const result2 = await author.save()
    //add tags to tag model
    if(tagsLowerCased?.length > 0) {
      tagsLowerCased.forEach (async tag=>  {
        const foundTag = await Tag.findOne({tagName:tag}).exec()
        if (foundTag?.posts) {
          foundTag.posts.unshift(result._id)
          await foundTag.save()
        }else {
            await Tag.create({
              tagName:tag,
              impressions:1,
              posts:[result._id]
            })
        }
      })
    }
    res.status(201).json(result);
  
  } catch (err) {
    res.status(409).json(err.message);
  }
};
module.exports = addPost;
