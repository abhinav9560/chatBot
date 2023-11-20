require('dotenv').config();
const OpenAIApi = require("openai");
const Msg = require("../database/models/msgSchema")

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
})



const connectBot = async (req, res) => {
    const userId = req.cookies.userId;
    try {
        let saveMsg = await Msg.create({
            role: 'user',
            content: req.body.msg,
            userId: userId
        }).then(res => {
            return true;
        }).catch(err => {
            console.log(err, " EOORR IN DATA BASEE");
            return false;
        })
        let conversation =  await Msg.find({ "userId": userId,}).select('-_id').select('-userId').select('-__v')
        if (saveMsg) {
            console.log(conversation, " CHAT BOT");
            const response = await openai.chat.completions.create({
                messages: conversation,
                model: "gpt-3.5-turbo",
                max_tokens: 64,
                temperature: 0.7,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                stop: ["\n"],
            });
            await Msg.create({
                role: response.choices[0].message.role,
                content: response.choices[0].message.content,
                userId: userId
            })
            // return res.redirect('/chatbot')
            return res.status(200).json(response.choices[0].message.content)
        }else{
            return res.redirect('/chatbot/error')
        }
    } catch (error) {
        console.log(error, "CONNNECTION ERROR");
        return  res.redirect('/chatbot/error')
    }
}
const getConversation = async (req, res) => {
    try {
        const data = await Msg.find({ conversationId: req.body.covId })
        res.status(200).send(data)
        console.log("data is", data);
        // if (data.password === req.body.password) {
        //     res.redirect('/')
        // } else {
        //     res.render('login', {
        //         error: "password incorrect"
        //     })
        // }
    } catch (error) {
        res.render('login', {
            error: "user not found"
        })
    }
}

module.exports = { connectBot, getConversation }