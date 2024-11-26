const express = require('express')
const AuthController = require('../controllers/AuthController')
const router = express.Router()
const foods = require('./food')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use('/foods', foods)



module.exports = router