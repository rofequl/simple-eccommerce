const {Router} = require('express')

const router = Router()

const CategoryController = require('../controllers/CategoryController')

// Category Api
router.get('/category', CategoryController.index)
router.get('/category/:id', CategoryController.show)
router.post('/category', CategoryController.create)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

module.exports = router
