const { DataTypes, Sequelize } = require('sequelize');
const db = require('./db');

const User = db.define('User', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

// criar tabela somente se não existir
User.sync()


module.exports = User;
