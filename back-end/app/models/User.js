const mongoose = require('mongoose')
const isEmail  = require('validator/lib/isEmail')

const Schema = mongoose.Schema 
const userSchema =new Schema({
    username: {
        type:String,
        required:[true, 'username in required' ],
        minlength: 4,
        maxlength: 70
    },
    email: {
        type: String,
        required: [true, 'email is required' ],
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message: function(){
                return 'invalid email'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'required password'],
        minlength: 8,
        maxlength: 128
    }
               
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User