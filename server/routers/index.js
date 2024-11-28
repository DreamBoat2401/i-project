const express = require('express')
const AuthController = require('../controllers/AuthController')
const router = express.Router()
const foods = require('./food')
const authentication = require('../middlewares/authentication')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/google-login', AuthController.googleLogin)

router.use(authentication)
router.use('/foods', foods)




module.exports = router