const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: String,
  author: {
    id: {type:Schema.Types.ObjectId , ref:'User'},
    username: String,
    profilePic: String,
  },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  date: Date,
  likes: [Object]
})

module.exports = mongoose.model('Comment', commentSchema)