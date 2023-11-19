const express = require('express');
const routes = express.Router();
const {connectBot,getConversation} = require('../controllers/connectBot')
const Msg = require("../database/models/msgSchema");
const { checkAuth } = require('../controllers/authcontroller');


routes.get("/",checkAuth,async (req, res) => {
    const userId = req.cookies.userId;
    const data = await Msg.find({ "userId": userId})
    res.render("home",{data})
})

routes.get("/getMsg",getConversation)

routes.post("/sendMsg",connectBot);

routes.get("/error",async (req, res) => {
    res.render("errorhandle")
})

module.exports = routes;