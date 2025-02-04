const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Investment = require('../models/investmentModel')
const axios = require('axios')
require('dotenv').config();


const createInvestmentForUser = async (req, res) => {

    try {
        const { categoryId, investmentData } = req.body
        const userId = req.userId // ID do usuário obtido do token

        console.log("Received userId:", userId);
        console.log("Received data:", req.body);

        if(!categoryId || !investmentData){

            return res.status(400).send("Missing categoryId or investmentData");
            
        }

        const quantity = investmentData.quantity || 1

        if(!investmentData.price || !quantity){
            return res.status(400).send("Missing required fields: price or quantity");
        }

        if(categoryId === 2 ){

            try{
                const acaoCurrent = await getPriceAcao(investmentData.description)
                console.log("Stock price fetched:", acaoCurrent);

                if(!acaoCurrent){
                    return res.status(404).send("Stock not found");
                }
                investmentData.priceCurrent = acaoCurrent
            }catch (error) {
                console.error("Error fetching stock price:", error);
                return res.status(500).send("Error fetching stock price");
            }


        }

        // Define um valor padrão para priceCurrent se não for categoria 2
        if (!investmentData.priceCurrent) {
            investmentData.priceCurrent = investmentData.price;
        }



        // Cria o investimento relacionado ao usuário e à categoria
        const investment = await Investment.create({
            ...investmentData,
            user_id: userId,
            category_id: categoryId
        })

        return res.status(200).json(investment)
    }catch(error){
        console.error("Error creating investment:", error);
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

const getPriceAcao = async (ticketAcao) => {

    try{

        const response = await searchApi(ticketAcao)

        if(!response){
            return null;
        }

        const stockData = response.results[0]
        return stockData.regularMarketPrice

    }catch(error){
        console.log("error to found investment")
        return null; 
    }


}

const getSearchInvestment = async (req,res) => {

    try{

        const { ticketAcao} = req.body

        const response = await searchApi(ticketAcao)

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

const deleteInvestment = async (req,res) => {

    try{

        
        const userId = req.userId
        const investmentId = req.body.investmentId

        if(!userId) {
            return res.status(500).send('not found user')
        }

        const investment  = await Investment.findByPk(investmentId)

        if (!investment) {
            return res.status(404).send('Investment not found');
        }

        // Verifique se o investimento pertence ao usuário
        if (investment.user_id !== userId) {
            return res.status(403).send('Unauthorized to delete this investment');
        }

        await investment.destroy(); // Deletar o investimento

        res.status(200).json({ message: 'Investment deleted successfully' })
    } catch(error){
        res.status(500).send('not possible delete investments')
    }

}



module.exports = {createInvestmentForUser, getAllInvestments, getSearchInvestment, deleteInvestment}