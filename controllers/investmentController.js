const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Investment = require('../models/investmentModel')
const axios = require('axios')
require('dotenv').config();


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

const token = process.env.MEU_TOKEN

async function searchApi(ticket){

    const endpoint = `https://brapi.dev/api/quote/${ticket}?token=${token}`

    try{
        const response = await axios.get(endpoint)

        return response.data
    
    } catch(error){
        console.error('Erro ao fazer a solicitação:', error);

    }
   
}

const getSearchInvestment = async (req,res) => {

    try{
        const response = await searchApi('ITUB4')

        if(!response){
            return res.status(500).send('not found BrApi')
        }

        const stockData = response.results[0]
        const stockPrice = stockData.regularMarketPrice

        res.status(200).json(stockPrice)
        return
    } catch(error){
        console.error('error search investment', error);

    }

}



module.exports = {createInvestmentForUser, getAllInvestments, getSearchInvestment}