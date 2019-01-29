const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const winston = require('./winston');

const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('combined', { stream: winston.stream }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
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
