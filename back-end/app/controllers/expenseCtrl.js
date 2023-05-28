const Expense = require('../models/Expense')
 
const expenseController = {}

expenseController.list = (req, res) => {
    Expense.find( { userId: req.user._id})
      .then((expense)=>{
          res.json(expense)
      })
      .catch((err)=>{
         res.json(err)
      })
}

expenseController.create = (req, res) => {
    const body = req.body 
    const expense = new Expense(body)
    expense.userId = req.user._id 
    expense.save()
       .then((expense) => {
           res.json(expense)
       })
       .catch((err)=> {
          res.json(err)
       })
}

expenseController.show = (req, res) => {
    const id = req. params.id 
    Expense.findOne( { _id: id, userId: req.user._id})
       .then((expense) =>{
           res.json(expense)
       })
       .catch((err)=>{
           res.json(err)
       })
}

expenseController.update = (req, res) => {
     const id = req.params.id 
     const body = req.body 
     Expense.findOneAndUpdate( { _id:id, userId: req.user._id}, body , {new :true, runValidators :true})
        .then((expense) =>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseController.destroy = (req, res) => {
    const id = req.params.id 
    Expense.deleteById( { _id:id, userId: req.user._id})
        .then((expense) =>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseController.soft = (req, res) => {
    Expense.findDeleted({ userId: req.user._id })
      .then((expense) => {
        res.json(expense)
      })
      .catch((err) => {
        res.json(err.message)
      })
  
  }

expenseController.permanentDelete = function(req, res){
    const id = req.params.id 
    Expense.findOneAndRemove({_id:id, userId:req.user._id})
      .then((expense)=>{
        res.json(expense)
      })
      .catch((err)=>{
        res.json(err)
      })
}

expenseController.restore = (req, res) => {
    const id = req.params.id 
    Expense.restore ( { _id:id, userId: req.user._id  , deleted : true})
       .then((expense) =>{
         res.json(expense)
       })
       .catch((err)=>{
           res.json(err)
       })
}


module.exports = expenseController