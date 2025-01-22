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
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
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