const express = require('express')
const app = express()

app.use(express.json())
const PORT = 3033

app.listen(PORT, () => {

    console.log('project running on', PORT)

})