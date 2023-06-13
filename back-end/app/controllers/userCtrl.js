const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Budget = require('../models/Budget')

const userController = {}

userController.register = (req, res) => {
   const body = req.body 
   const user = new User(body)
   bcryptjs.genSalt()
     .then((salt) => {
        bcryptjs.hash(user.password, salt)
          .then((encrypted)=> {
              user.password = encrypted 
              user.save()
                 .then((users)=>{
                  const budget = new Budget( { userId : user._id})
                  budget.save()
                  const profile = new Profile({userId:user._id})
                  profile.save()
                    res.json(users)
                 })
                 .catch((err)=>{
                    res.json(err)
                 })
          })
     })

}


userController.login = (req,res) => {
    const body = req.body
    User.findOne ({ email : body.email})
       .then((user)=> {
           if(!user){
               res.json({errors: 'invalid email or password'})
           } else {
              bcryptjs.compare(body.password, user.password)
                 .then((match)=> {
                      if(match){
                          const tokenData = {
                             _id: user._id,
                             username: user.username,
                             email: user.email
                          }
                          const token = jwt.sign(tokenData,  'dct@123', {expiresIn : '60d' })
                          res.json({ token : `Bearer ${token}`})
                      } else {
                         res.json({ errors: 'invalid email or password'})
                      }
                 })
           }
           
       })
}

userController.account = (req, res) => {
   res.json(req.user)   
}

module.exports = userController