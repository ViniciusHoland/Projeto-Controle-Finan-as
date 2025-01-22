const Category = require('../models/categoryModel')

const createdCategory = async (req, res) => {

    try{

        const {name} = req.body

        const category = await Category.findOne({where: {name: name}})

        if(category){
            return res.status(200).send('category is already register ')
        }

        await Category.create({
            name,
        })

        return res.status(201).send('created category with sucessfully')

    }catch(error){
        res.status(500).send({error: 'not possible created category'})
    }

}

module.exports = { createdCategory }