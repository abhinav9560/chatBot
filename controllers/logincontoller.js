const User = require('../database/models/userSchema')

const createUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
    } else {
        await User.create({
            email: email,
            password: password,
        })
        res.redirect('auth/login')
    }
}

const checkUser = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email })
        if (userData.password === req.body.password) {
            res.cookie('userId',userData._id, { httpOnly: true })
            res.redirect('/chatbot')
        } else {
            res.render('login', {
                error: "password incorrect"
            })
        }
    } catch (error) {
        console.log("error is", error);
        res.render('login', {
            error: "user not found"
        })
    }
}
module.exports = { checkUser, createUser }