const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const { Users } = require('./mongoose');

passport.use(new FacebookStrategy({
  clientID: 2231496073548574,
  clientSecret: '1592878f8eb54111f87bba8baee854fb',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
},
(async (accessToken, refreshToken, profile, done) => {
  let user = await Users.findOne({
    'facebook.id': profile.id,
  });

  if (!user) {
    user = await Users.create({
      facebook: {
        id: profile.id,
        token: accessToken,
      },
    });
  }

  done(null, user);
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
