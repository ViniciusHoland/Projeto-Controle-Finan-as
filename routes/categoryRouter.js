const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.post('/category', categoryController.createdCategory)


module.exports = router