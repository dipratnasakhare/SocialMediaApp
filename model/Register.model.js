const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: 'ObjectId', ref: 'Post' }],
    friends: [{ type: 'ObjectId', ref: 'User' }],
    friendRequests: [{ type: 'ObjectId', ref: 'User' }]
  })

const ModelRegister= mongoose.model("UserRegister", UserSchema)

module.exports = { ModelRegister }