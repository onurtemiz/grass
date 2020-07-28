const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const lessonsRouter = require('./controllers/lessons');
const teachersRouter = require('./controllers/teachers');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const allRouter = require('./controllers/all');
const reportsRouter = require('./controllers/reports');
const tipsRouter = require('./controllers/tips');
const commentsRouter = require('./controllers/comments');
const middleware = require('./utils/middleware');
const clubsRouter = require('./controllers/clubs');
const campusesRouter = require('./controllers/campuses');
const dormsRouter = require('./controllers/dorms');
const questionsRouter = require('./controllers/questions');
const coursesRouter = require('./controllers/courses');
const eventsRouter = require('./controllers/events');
const signupRouter = require('./controllers/signup');

// const tok = require('./heh');
// tok();
const mongoUri = async () => {
  let mongoUri;
  if (process.env.NODE_ENV === 'test') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = new MongoMemoryServer();
    mongoUri = await mongoServer.getConnectionString();
  } else {
    mongoUri = process.env.MONGODB_URI;
  }
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((e) => {
      console.log('error connection to MongoDB', e.message);
    });
};

mongoUri();

if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'dev') {
  app.set('trust proxy', 1);
}
app.use(cors());
var helmet = require('helmet');
app.use(helmet());
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
const apiRouter = require('express').Router();
apiRouter.use('/login', loginRouter);
apiRouter.use('/signup', signupRouter);
apiRouter.use(middleware.tokenExtractor);
apiRouter.use(middleware.authUser);
apiRouter.use('/users', usersRouter);
apiRouter.use('/courses', coursesRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/questions', questionsRouter);
apiRouter.use('/dorms', dormsRouter);
apiRouter.use('/campuses', campusesRouter);
apiRouter.use('/clubs', clubsRouter);
apiRouter.use('/all', allRouter);
apiRouter.use('/teachers', teachersRouter);
apiRouter.use('/lessons', lessonsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/tips', tipsRouter);
apiRouter.use('/reports', reportsRouter);
app.use('/api', apiRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
