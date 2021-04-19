'use strict';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportJWT from 'passport-jwt';
import userModel from '../models/userModel.js';

const Strategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new Strategy(
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({ username });
            console.log('Local strategy', user);
            if (user === null) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            const strippedUser = user.toObject();
            delete strippedUser.password;
            return done(null, strippedUser, { message: 'Logged In Successfully' });
        } catch (err) {
            return done(err);
        }
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mysecret',
},
    async (jwtPayload, done) => {
        console.log('payload', jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            const user = await userModel.findById(jwtPayload._id,
                '-password -__v');
            console.log('pl user', user);
            if (user !== null) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(null, false);
        }
    },
));

export default passport;
