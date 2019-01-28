const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const winston = require('./winston');
const passport = require('./passport');

const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('combined', { stream: winston.stream }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('auth'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'auth', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    next(createError(401));
  }
  next();
});

app.use('/news', newsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
