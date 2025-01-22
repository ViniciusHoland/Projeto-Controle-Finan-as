const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Investment = require('../models/investmentModel')

const createInvestmentForUser = async (req, res) => {

    try {
        const { categoryId, investmentData } = req.body
        const userId = req.userId // ID do usuário obtido do token

        
        // Cria o investimento relacionado ao usuário e à categoria
        const investment = await Investment.create({
            ...investmentData,
            user_id: userId,
            category_id: categoryId
        })

        return res.status(200).send(investment)
    }catch(error){
        return res.status(500).send('not possible create investment, please again')
    }
    
}

module.exports = {createInvestmentForUser}