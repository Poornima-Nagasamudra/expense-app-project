const Category = require('../models/Category.js')

const categoryController = {}

categoryController.list = (req, res) => {
    Category.find( { userId : req.user._id})
        .then((cat)=> {
            res.json(cat)
        })
        .catch((err)=> {
            res.json(err)
        })
}

categoryController.create = (req, res) =>{
    const body = req.body 
    const category = new Category (body)
    category.userId = req.user._id
    category.save()
       .then((cat)=>{
          res.json(cat)
       })
       .catch((err)=> {
          res.json(err)
       })   
}

categoryController.show = (req,res) => {
    const id = req.params.id 
    Category.findOne ({ _id: id, userId: req.user._id})
       .then((cat)=> {
          res.json(cat)
       })
       .catch((err)=>{
          res.json(err)
       })
}

categoryController.update = (req, res) => {
    const id = req.params.id 
    const body = req.body
    Category.findOneAndUpdate( {_id: id, userId: req.user._id}, body, {new: true, runValidators: true })
        .then((cat)=> {
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoryController.destroy = (req, res) => {
    const id = req.params.id 
    Category.findByIdAndDelete({ _id: id, userId: req.user._id})
        .then((cat)=>{
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = categoryController