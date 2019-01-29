const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jwt-simple');

const { auth: { jwt: { secret } } } = require('./config');
const { auth: { facebook } } = require('./config');

const { Users } = require('./mongoose');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    let user = await Users.findOne({ email }).lean();

    if (!user) {
      user = await Users.create({
        email,
        local: {
          password,
        },
      });
      return done(null, jwt.encode({ email }, secret));
    }

    if (!user.local) {
      user = await Users.findOneAndUpdate({ email }, { $set: { local: { password } } });
      return done(null, jwt.encode({ email }, secret));
    }

    if (user.local.password !== password) {
      return done(null, false);
    }

    return done(null, jwt.encode({ email }, secret));
  }));

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const { email } = jwt.decode(token, secret);
    const user = await Users.findOne({ email });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(null, false);
  }
}));

passport.use(new FacebookStrategy({
  clientID: facebook.clientID,
  clientSecret: facebook.clientSecret,
  callbackURL: facebook.callbackURL,
  profileFields: ['id', 'emails', 'name'],
}, (async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  let user = await Users.findOne({ email }).lean();

  if (!user) {
    user = await Users.create({
      email,
      facebook: {
        id: profile.id,
        token: accessToken,
      },
    });
    return done(null, jwt.encode({ email }, secret));
  }

  if (!user.facebook) {
    user = await Users.findOneAndUpdate({ email }, {
      $set: {
        facebook: {
          id: profile.id,
          token: accessToken,
        },
      },
    });
    return done(null, jwt.encode({ email }, secret));
  }

  return done(null, jwt.encode({ email }, secret));
})));

module.exports = passport;
