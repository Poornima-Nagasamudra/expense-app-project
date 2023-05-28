const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userCtrl')
const budgetController = require('../app/controllers/budgetCtrl')
const categoryController = require('../app/controllers/categoryCtrl')
const authenticateUser = require('../app/middleware/authoticateUser')
const expenseController = require('../app/controllers/expenseCtrl')
const profileController = require('../app/controllers/profileCtrl')
const upload = require('../app/middleware/upload')

//Register
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.get('/users/account', authenticateUser, userController.account)

//Budget
router.get('/users/budget', authenticateUser,  budgetController.show)
router.put('/users/budget/:id', authenticateUser,  budgetController.update)

//Category
router.get('/users/category', authenticateUser, categoryController.list)
router.post('/users/category', authenticateUser, categoryController.create)
router.get('/users/category/:id', authenticateUser, categoryController.show)
router.put('/users/category/:id', authenticateUser, categoryController.update)
router.delete('/users/category/:id', authenticateUser, categoryController.destroy)

//Expense
router.get('/users/expense', authenticateUser, expenseController.list)
router.post('/users/expense', authenticateUser, expenseController.create)
router.get('/users/expense/:id', authenticateUser, expenseController.show)
router.put('/users/expense/:id', authenticateUser, expenseController.update)
router.delete('/users/expense/:id', authenticateUser, expenseController.destroy)

router.get('/users/expensesoft', authenticateUser, expenseController.soft)
router.delete('/users/permanentDelete/:id', authenticateUser, expenseController.permanentDelete)
router.get('/users/restore/:id', authenticateUser, expenseController.restore )

//Profile
router.get('/users/profile',  authenticateUser, profileController.list)
router.post('/users/profile', authenticateUser, profileController.create)
router.get('/users/profile/:id', authenticateUser, profileController.show)
router.put('/users/profile/:id', authenticateUser , profileController.update)

router.put('/users/profilepic/:id', authenticateUser, upload.single('avatar'),  profileController.updateImage)


module.exports = router