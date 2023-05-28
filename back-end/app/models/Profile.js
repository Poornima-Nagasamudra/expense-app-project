const mongoose = require('mongoose')

const Schema = mongoose.Schema 
const profileSchema = new Schema({
    name: {
        type:String
    },
    age : {
        type: String
    },
    occupation : {
        type: String
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }, 
    avatar : {
            type : String
    }     
}, {timestamps: true})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile