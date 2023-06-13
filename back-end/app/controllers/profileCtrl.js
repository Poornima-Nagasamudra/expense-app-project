const Profile = require('../models/Profile')

const profileController = {}

profileController.list = (req, res) => {
    Profile.find({ userId: req.user._id})
       .then((profile)=> {
           res.json(profile)
       })
       .catch((err) => {
          res.json(err)
       })
}

profileController.create = (req, res) => {
    const body = req.body 
    const profile = new Profile(body)
    profile.userId = req.user._id
    profile.save()
       .then((profile) => {
          res.json(profile)
       })
       .catch((err) => {
           res.json(err)
       })
}

profileController.show = (req, res) => {
    const id = req.params.id
    Profile.findOne( {_id:id, userId: req.user._id })
       .then((profile)=> {
          res.json(profile)
       })
       .catch((err)=>{
          res.json(err)
       })
}

profileController.update = (req, res) => {
   const id = req.params.id 
   const body = req.body 
   Profile.findOneAndUpdate({ _id:id, userId: req.user._id}, body, {new:true, runValidators: true})
   .then((profile)=> {
      res.json(profile)
   })
   .catch((err)=>{
      res.json(err)
   })
  
}

profileController.destroy = (req, res) => {
   const id = req.params.id 
   Profile.findOneAndDelete( {_id:id , userId:req.user._id })
       .then((profile) => {
           res.json(profile)
       })
       .catch((err) => {
          res.json(err)
       })
}

profileController.updateImage = (req, res) => {
   if (req.file) {
      const id = req.params.id 
      const body = req.body 
      body.avatar = req.file.path 
      Profile.findOneAndUpdate({_id: id, userId: req.user._id}, body, {new:true, runValidators:true})
      .then((profile)=> {
         res.json(profile)
      })
      .catch((err)=>{
         res.json(err)
      })
   } else {
       res.json({ errors: 'Only jpg, jpeg, png and pdf file supported!' })
   }
}


module.exports = profileController