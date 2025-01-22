const express = require('express')
const router = express.Router()

const investmentController = require('../controllers/investmentController')
const authenticate = require('../middlewares/authenticate')

router.post('/investment', authenticate , investmentController.createInvestmentForUser)


module.exports = router 