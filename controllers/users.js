const User = require('../database/models/userSchema');



const createUser = async (req, res) => {
    const { title, desc, author, labels, projectId } = req.body;
    if (!title || !desc || !author || !projectId) {
        res.send(400)
    } else {
        const project = await User.create({
            name: title,
            email: desc,
            password: [...labels],
            isAdmin: author,
        })
        res.send(200, project)
    }
}



module.exports = { createUser }