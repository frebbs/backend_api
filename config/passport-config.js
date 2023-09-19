import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dbUtils from '../utils/db_utils.js';  // Import the db_utils object

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Chang3m3.',
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            // Find the user based on the JWT payload using the getUserById function from db_utils
            const user = await dbUtils.getUserById(jwt_payload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);
