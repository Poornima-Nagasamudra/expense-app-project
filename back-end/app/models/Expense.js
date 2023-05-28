const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete') 


const Schema = mongoose.Schema
const expenseSchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        reuired: true
    },
    expensedate: {
        type: String,
        required: true
    },
    categoryId : {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type : String,
        required: true
    }
}, {timestamps : true })

 expenseSchema.plugin(mongoose_delete,{overrideMethods:true})

const Expense = mongoose.model('Expense', expenseSchema)


module.exports = Expense