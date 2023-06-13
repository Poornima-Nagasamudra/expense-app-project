const Budget = require('../models/Budget')

const budgetController = {}

budgetController.show = (req, res) => {
    Budget.findOne( {  userId: req.user._id})
       .then((budget)=> {
          res.json(budget)
       })
       .catch((err) => {
        res.json(err)
       })
}

budgetController.update = (req,res) => {
    const id = req.params.id
    const body =  req.body
    Budget.findOneAndUpdate({_id:id, userId:req.user._id}, body, {new:true, runValidators:true})
        .then((budget)=> {
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })

}


module.exports = budgetController