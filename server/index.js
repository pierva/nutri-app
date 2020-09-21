const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// CREATE AND IMPORT MODELS HERE

const app = express()

// CREATE DB CONNECTIONS HERE

app.get('/', (req, res) => {
    res.send('Server is listening')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})