const passport    = require("passport");  
const passportJWT = require("passport-jwt");  
const User        = require("../models/USERS");  
const cfg         = require("../jwt");  

const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy   = passportJWT.Strategy;  

const params = {  
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

module.exports = function() {  
    var strategy = new Strategy(params, async (payload, done) => {
        const user = await User.findOne({_id: payload.id});
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", process.env.JWT_SESSION);
        }
    };
};