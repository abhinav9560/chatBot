const express = require("express");
const routes = express.Router();
const User = require('../database/models/userSchema');
const initializePassport = require("../passport-config")
const { createUser, checkUser } = require('../controllers/logincontoller');
const passport = require("passport")

initializePassport(
    passport,
    email => {
        const data = User.findOne({ email: email }).then(data => {
            if (data) {
                return data;
            } else {
                return null;
            }
        })
        return data;
    },
    id => {
        console.log(id, "PASSPOET");
        const data = User.findOne({ _id: id }).then(data => {
            if (data) {
                return data;
            } else {
                return null;
            }
        })
        return data;
    }
)
routes.get('/login', (req, res) => {
    res.render('login')
})
routes.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.render('login')
})
routes.post('/login', checkUser)

routes.get('/signup', (req, res) => {
    res.render('signup')
})
routes.post('/signup', createUser);


module.exports = routes;