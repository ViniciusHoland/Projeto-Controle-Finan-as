const express = require('express')
const router = express.Router()

const investmentController = require('../controllers/investmentController')
const authenticate = require('../middlewares/authenticate')

router.post('/investment', authenticate , investmentController.createInvestmentForUser)
router.get('/investment',authenticate,investmentController.getAllInvestments)
router.get('/investment/search', investmentController.getSearchInvestment)


module.exports = router 