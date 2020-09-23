const mongoose = require('mongoose')

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String,
        required: true
    })
)

module.exports = Role