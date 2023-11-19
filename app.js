const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser')
const ConnectDB = require('./database/connectdb');
const homeRoute = require('./router/homeRouter');
const loginRoute = require('./router/loginRouter')

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials");

app.use(cookieParser());
app.use('/chatbot', homeRoute);
app.use('/auth', loginRoute)

const startServer = async () => {
    try {
        await ConnectDB('mongodb+srv://abhinavanand0411:User123@issuetracker.ym6ulwy.mongodb.net/').then(() => {
            console.log("DB connection successfull");
        })
        app.listen(3001, () => {
            console.log("server is runninng");
        })
    } catch (error) {
        console.log(error, "ERRR");
    }
}

startServer()