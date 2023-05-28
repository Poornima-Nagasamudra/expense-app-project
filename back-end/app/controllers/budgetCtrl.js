const Budget = require('../models/Budget')

const budgetController = {}

budgetController.show = (req, res) => {
  //console.log('check222', req.body)
    Budget.findOne( {  userId: req.user._id})
       .then((budget)=> {
       // console.log('budget',budget)
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
          //console.log(budget)
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })

}


module.exports = budgetController