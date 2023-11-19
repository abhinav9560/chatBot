const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../database/models/userSchema');

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: 'srt',
}

passport.use(new Strategy(options, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
        .then(data => {
            return done(null, data)
        })
        .catch(err => {
            console.log(err, "JWT ERROR");
            return done(null, false);
        })
}));

module.exports = passport;