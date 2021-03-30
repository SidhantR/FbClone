// mongo db schemaa


import mongoose from 'mongoose'

const postModel = mongoose.Schema({
    user: String,
    imgName: String ,
    text : String,
    avatar : String ,
    timestamp : String
})
export default mongoose.model('posts', postModel)

// posts is the collection where you will bw saving your post