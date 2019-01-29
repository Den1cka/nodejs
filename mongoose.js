const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.mongoose.connection, {
  useNewUrlParser: true,
  dbName: config.mongoose.database,
  user: config.mongoose.user,
  pass: config.mongoose.password,
});

const usersSchema = new mongoose.Schema({
  email: String,
  local: {
    password: String,
  },
  facebook: {
    type: {
      id: String,
      token: String,
    },
  },
});

const Users = mongoose.model('Users', usersSchema);

const newsSchema = new mongoose.Schema({
  author: String,
  title: String,
  description: String,
  content: String,
});

const News = mongoose.model('News', newsSchema);

module.exports = { Users, News };
