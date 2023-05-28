require('dotenv').config()
const express = require('express') 
const app = express()
const cors = require('cors')
const expenseDB = require('./config/database.js')
expenseDB()
const routes = require('./config/routes')

const port = 3111 

app.use(express.json())
app.use(cors())
app.use('/', routes)
app.use('/uploads', express.static('uploads'))

app.listen(port, function(){
    console.log('server running on', port)
})