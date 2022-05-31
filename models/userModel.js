const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        required : true ,
         type : String,
         trim : true,
         unique : true
        },
    password : {
        required : true,
        type : String,
        },
    firstname :{
        type:String,
        trim: true
    } ,
    lastname:{
        type:String,
        trim:true
    },
    email:{
        required : true ,
        type : String,
        trim:true,
        unique : true
    },
    profilePic : String,
    followers : [{type:Schema.Types.ObjectId , ref:'users'}],
    followings : [{type:Schema.Types.ObjectId , ref:'users'}],
    requestsSent: Array,
    requestsGot:Array,
    posts : [{type:Schema.Types.ObjectId , ref:'posts'}],
    refreshToken : String,
    roles : {
        User: {
            type: Number,
            default: 1373
        },
        Editor: Number,
        Admin: Number
    },
    bio:String,
    notifications:[{type:Schema.Types.ObjectId , ref:'notifications'}]

})

module.exports = mongoose.model('User', userSchema);