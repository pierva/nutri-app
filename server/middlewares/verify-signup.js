const db = require('../models')
const ROLES = db.ROLES
const User = db.user

const verifySignUp = {

}

verifySignUp.checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Verify Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            console.error('Error while finding username', err);
            res.status(500).send({ message: err })
            return
        }

        if (user) {
            res.status(400).send({
                message: `Please use a different username. Username ${req.body.username} already in use`
            })
            return
        }

        // Verify Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err) {
                console.error('Error while finding email', err);
                res.status(500).send({ message: err })
                return
            }

            if (user) {
                res.status(400).send({
                    message: `Please use a different email. Email ${req.body.email} already in use`
                })
                return
            }

            next()
        })
    })
}

verifySignUp.checkRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let role in req.body.roles) {
            if(!ROLES.includes(role)) {
                res.status(400).send({
                    message: `Error! Role ${role} does not exist in db!`
                })
                return
            }
        }
    }
    next()
}

module.exports = verifySignUp