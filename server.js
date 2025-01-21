const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')

const db = require('./models/db')

app.use(express.json())
const PORT = 3033

app.use('/login', userRoute)
app.use('/register', userRoute)



app.listen(PORT, () => {

    console.log('project running on', PORT)

})