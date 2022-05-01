const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//login strategy

const verifier = async (username, password, done) => {
  try {
    const user = await User.findOne({ name: username });
    if (!user) {
      //user not found, incorrect username entered
      return done(null, false, { message: "Incorrect username" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      //password check passed, return user
      return done(null, user);
    }
    //else password check has failed
    return done(null, false, { message: "Incorrect password" });
  } catch (e) {
    return done(e);
  }
};

passport.use(
  new LocalStrategy((username, password, done) => {
    verifier(username, password, done);
  })
);

//token strategy (auth)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret", //need to update to a proper key TODO
    },
    async (jwtPayload, cb) => {
      console.log(jwtPayload);
      try {
        const user = await User.findById(jwtPayload._id);
        if (user) {
          const name = user.name;
          const iat = jwtPayload.iat;
          const rv = { name, iat }; //return value
          return cb(null, rv);
        } else {
          throw new Error("user not found");
        }
      } catch (e) {
        return cb(e);
      }
    }
  )
);
