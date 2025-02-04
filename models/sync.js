
const db = require('./db')
const Investment = require('./investmentModel')

db.sync({alter: true})
.then(() => {
    console.log('banco de dados sicronizado com sucesso')
})
.catch((error) => {

    console.error('Erro ao sincronizar o banco de dados:', error)
})