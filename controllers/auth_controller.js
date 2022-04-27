const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//login
exports.login = async (req, res) => {
  //authenticate using local strategy (check if username/pwd is valid)
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      //authentication failed so return 400 + error message
      return res.status(400).json({
        message: info.message ? info.message : "Something went wrong",
        user: user,
      });
    }
    //auth passed so login and generate token for return to client
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), "secret", { expiresIn: "10000s" });
      return res.json({ user, token });
    });
  })(req, res);
};
//signup
exports.signup = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      throw new Error("Admin Already Exists");
      // throw if user already exists
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.username,
      password: hashPassword,
    });
    await user.save();
    res.send({ user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
