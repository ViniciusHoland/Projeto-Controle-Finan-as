const { DataTypes } = require('sequelize')
const db = require('./db')
const User = require('./userModel')
const Category = require('./categoryModel')

const Investment = db.define('Investment', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    priceCurrent: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    valuation: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',


})

//definindo relações

User.hasMany(Investment, {
    foreignKey: 'user_id',
    as: 'investments'
})

Investment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

Category.hasMany(Investment, {
    foreignKey: 'category_id',
    as: 'investments'
})

Investment.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
})

// Sincronizar o modelo
Investment.sync();

module.exports = Investment;