const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const lessonsRouter = require('./controllers/lessons');
const teachersRouter = require('./controllers/teachers');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const commentsRouter = require('./controllers/comments');
const middleware = require('./utils/middleware');

console.log('connecting to', config.MONGODB_URI);
const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.log('error connection to MongoDB', e.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use('/api/teachers', teachersRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/comments', commentsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
