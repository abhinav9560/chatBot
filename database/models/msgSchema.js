const mongoose = require("mongoose");

const msg = mongoose.Schema({
    role: {
        type: String
    },
    content: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

})

module.exports = mongoose.model('Msg', msg);