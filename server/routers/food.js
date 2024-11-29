const express = require('express')
const FoodController = require('../controllers/FoodController')
const router = express.Router()

router.get('/', FoodController.read)
router.post('/', FoodController.create)
router.get('/recommendation', FoodController.recommendation)
router.get('/:id', FoodController.readDetail)
router.put('/:id', FoodController.update)
router.delete('/:id', FoodController.delete)



module.exports = router