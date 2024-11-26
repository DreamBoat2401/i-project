const express = require('express')
const FoodController = require('../controllers/FoodController')
const router = express.Router()

router.get('/', FoodController.read)
router.post('/', FoodController.create)
router.put('/:id', FoodController.update)
router.delete('/:id', FoodController.delete)



module.exports = router