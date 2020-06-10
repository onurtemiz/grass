const questionsRouter = require('express').Router();
const Question = require('../models/question');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

questionsRouter.all('*', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);

  if (user == undefined) {
    return res.status(401).json({
      error: 'user not found',
    });
  }

  req.user = decodedToken.id;

  next();
});

questionsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (!body || !body.description || !body.question) {
    return res.status(400).json({
      error: 'missing information',
    });
  }
  if (body.description.length > 1000 || body.question.length > 42) {
    return res.status(400).json({
      error: 'overlimit',
    });
  }

  const question = new Question({
    question: body.question,
    description: body.description,
  });
  await question.save();
  res.json(question.toJSON());
});

questionsRouter.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id).populate('comments');
  return res.json(question.toJSON());
});

questionsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) && !('total' in q)) {
    res.status(400).json({
      error: 'need start or total',
    });
  }
  const search = q.search ? q.search : '';
  const questions = await Question.find({
    $and: [
      { isApproved: true },
      { question: { $regex: search, $options: 'i' } },
    ],
  });
  const jsonQuestions = questions.map((q) => q.toJSON());
  console.log('jsonQuestions.length', jsonQuestions.length);
  res.json({ questions: jsonQuestions, total: jsonQuestions.length });
});

questionsRouter.all('*', async (req, res, next) => {
  const user = await User.findById(req.user);
  if (
    !user ||
    user.isAdmin != true ||
    user.email !== 'onur.temiz@boun.edu.tr'
  ) {
    return res.status(401).json({
      error: 'not admin',
    });
  }
  next();
});

questionsRouter.get('/all', async (req, res) => {
  const questions = await Question.find();
  res.json(questions.map((q) => q.toJSON()));
});

questionsRouter.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: 'no id',
    });
  }
  const question = await Question.findById(req.params.id);
  question.isApproved = !question.isApproved;
  await question.save();
  res.status(200).end();
});

questionsRouter.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: 'no id',
    });
  }
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = questionsRouter;
