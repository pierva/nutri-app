const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dbConfig = require('./config/db.config')

// CREATE AND IMPORT MODELS HERE

// Configure environment variables
const dotenv = require('dotenv')
dotenv.config()

const app = express()

/* MIDDLEWARE SETUP */
app.use(cors())

// parse content-type - application/json
app.use(bodyParser.json())

// parse content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))


// DATABASE CONFIGURATION AND CONNECTION
const db = require("./models")
const Role = db.role

/**
 * DATABASE URL CONFIGURATION
 * If no url is found in the environment variable, use the local db configured in config/db.config.js file
 */
let db_url = process.env.DATABASEURL

if(!db_url || db_url === ""){
    db_url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
}

db.mongoose
    .connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to Database');
        initial()
    })
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
    })

function initial () {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            // Create standard user role
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }
                console.log("added 'user' to roles collection")       
            })

            // Create admin user role
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }
                console.log("added 'user' to roles collection")       
            })
        }
    })
}


app.get('/', (req, res) => {
    res.send('Server is listening')
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})