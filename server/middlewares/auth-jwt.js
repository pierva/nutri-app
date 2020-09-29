const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const Role = db.role

const authJwt = {}

authJwt.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            message: "No token provided in header!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            })
        }
        req.userId = decoded.userId
        next()
    })
}

authJwt.isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }

        Role.find(
            {
                _id: { $in: user.rolest}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }

                for (const role of roles) {
                    if (role === "admin") {
                        next()
                        return
                    }
                }

                res.status(403).send({
                    message: "Admin Role required!"
                })
                return
            }
        )
    })
}

module.exports = authJwt