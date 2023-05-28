const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateUser = (req, res, next) => {      
    let token = req.headers['authorization'].split(' ')[1]
   // console.log('10101', token)
      // let tokenData
            try{
                let tokenData = jwt.verify(token, 'dct@123')
                //res.json(tokenData)
                User.findById(tokenData._id)
                .then((user) => {
                   // console.log(user)
                    req.user = user
                    next()
                })
                .catch((err) => {
                    res.json(err)
                }) 
            } catch(e){
                res.status(400).json(e)
            }
       
    
}

module.exports = authenticateUser