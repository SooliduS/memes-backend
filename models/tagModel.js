const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema ({
    tagName:{
        type:String,
        required:true
    },
    impressions :Number,
    posts : [{type:Schema.Types.ObjectId , ref:'Post'}]
})

module.exports = mongoose.model('Tag', tagSchema);