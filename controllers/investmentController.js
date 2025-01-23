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

        return res.status(200).json(investment)
    }catch(error){
        return res.status(500).send('not possible create investment, please again')
    }
    
}


const getAllInvestments = async (req,res) => {

    try{

        const userId = req.userId

        if(!userId) {
            return res.status(500).send('not found user')
        }

        const investments = await Investment.findAll({
            where: {user_id: userId},
            include: [
                {
                    model: Category,
                    as: 'category'
                },
            ],
        })

        res.status(200).json(investments)

    } catch(error){
        return res.status(500).send('not found investments')
    }


}

module.exports = {createInvestmentForUser, getAllInvestments}