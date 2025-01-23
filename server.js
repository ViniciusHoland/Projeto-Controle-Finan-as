const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRouter')
const investmentRouter = require('./routes/investmentRouter')

const db = require('./models/db')
require('dotenv').config();

app.use(express.json())
const PORT = 3033

app.use('/', userRoute)
app.use('/', categoryRoute)
app.use('/',investmentRouter)





app.listen(PORT, () => {

    console.log('project running on', PORT)

})