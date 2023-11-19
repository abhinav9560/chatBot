function checkAuth(req, res, next) {
    let userID = req.cookies.userId
    if (userID) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}


module.exports = { checkAuth }