const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    notifType:Number,
    visited:{
        type:Boolean,
        default:false
    },
    userId:{type:Schema.Types.ObjectId , ref:'users'},
    opponent:String,
    opponentId:{type:Schema.Types.ObjectId , ref:'users'},
    postId:{type:Schema.Types.ObjectId , ref:'posts'},
    aproved:{
        type:Boolean,
        default:false
    },
    date:Date
})

module.exports = mongoose.model('Notification', notificationSchema)