const config = {
  mongoose: {
    connection: 'mongodb+srv://fc-mongo-on2s4.azure.mongodb.net?retryWrites=true',
    database: 'frontcamp',
    user: 'dzianis_liashchevich',
    password: 'inthedominowood',
  },
  auth: {
    jwt: {
      secret: 'auth-test',
    },
    facebook: {
      clientID: 2231496073548574,
      clientSecret: '1592878f8eb54111f87bba8baee854fb',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
  },
};

module.exports = config;
