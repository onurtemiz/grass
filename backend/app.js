const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const lessonsRouter = require('./controllers/lessons');
const teachersRouter = require('./controllers/teachers');

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

app.use('/api/teachers', teachersRouter);
app.use('/api/lessons', lessonsRouter);

module.exports = app;
