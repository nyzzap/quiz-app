const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'QuizSecret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => user ? done(null, user) : done(null, false))
            .catch(err => console.error(err));
    }));
}