const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const getUser = async (req, res) => {
    try{
        const users = await User.findAll()

    res.status(200).send(users)
    } catch (error){
        res.status(500).send({error: 'not found all user'})
    }
    

}

const loginUser = async (req,res) => {

    try{
        const {email, password } = req.body

        const user = await User.findOne({where: {email: email}})

        if (user && user.password === password) {

            const token = jwt.sign(
                { id: user.id, email: user.email }, // Payload do token
                process.env.JWT_SECRET,                 // Substitua por uma variável de ambiente (segredo do JWT)
                { expiresIn: '2h' }                // Tempo de expiração do token
            );

            console.log('User is registered, token generated');

            return res.status(200).json({
                message: 'Login successful',
                token: token,
            });

        } else{
            console.log('user or password incorret')
            return res.status(200).send('user or password incorret')
        }

    } catch(error){
        res.status(500).send({error: 'Unable to login'})
    }

}

const createdUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const user = await User.findOne({where: {email: email}})

        if (user) {
            console.log('user is register')
            return res.status(200).json('User is already registered')
        }

        const newUser = await User.create({
            name,
            email,
            password,
        }) 

        
        res.status(201).send('Created user sucessfully')

    } catch(error){
        res.status(500).send({error: 'not possible created user'})
    }


}

module.exports = { getUser, createdUser, loginUser}