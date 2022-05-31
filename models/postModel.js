const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({

    postType: {
        type:Number,
        default:1
    },
    author:{type:Schema.Types.ObjectId , ref:'User'},
    authorName:String,
    authorPic:String,
    likes:[{type:Schema.Types.ObjectId , ref:'User'}],
    title:String,
    caption:String,
    dateCreated:Date,
    dateEdited:Date,
    tags:{
        type:[String],
        trim:true,
        lowercase:true
    },
    views:{
        type:Number, 
        default:0,   
},
    private:{type:Boolean, default:false},
    comments:[{type:Schema.Types.ObjectId , ref:'Comment'}],
    media:String,
})

module.exports = mongoose.model('Post', postSchema)