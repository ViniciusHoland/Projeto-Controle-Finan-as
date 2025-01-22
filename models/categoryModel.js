const { DataTypes } = require('sequelize');
const db = require('./db');

const Category = db.define('Category', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

// criar tabela somente se não existir
Category.sync()


module.exports = Category;