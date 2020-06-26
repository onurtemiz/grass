const questionsRouter = require('express').Router();
const Question = require('../models/question');
const middleware = require('../utils/middleware');

questionsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (!body || !body.description || !body.question) {
    return res.status(400).json({
      error: 'Eksik bilgi girildi.',
    });
  }
  if (body.question.length > 42) {
    return res.status(400).json({
      error: 'Sorunuz 42 karakterden çok',
    });
  }

  if (body.description.length > 1000) {
    return res.status(400).json({
      error: 'Açıklamanız 1000 karakterden çok',
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
      error: 'Onur bir şeyleri batırdı. Hata kodu 3',
    });
  }
  const search = q.search ? q.search : '';
  const questions = await Question.find({
    $and: [
      { isApproved: true },
      { question: { $regex: search, $options: 'i' } },
    ],
  })
    .sort({ date: -1 })
    .skip(Number(q.start))
    .limit(Number(q.total));
  const jsonQuestions = questions.map((q) => q.toJSON());
  res.json({ questions: jsonQuestions, total: jsonQuestions.length });
});

questionsRouter.use(middleware.authAdmin);

questionsRouter.get('/all', async (req, res) => {
  const questions = await Question.find();
  res.json(questions.map((q) => q.toJSON()));
});

questionsRouter.put('/ea/:id', async (req, res) => {
  const body = req.body;
  const question = await Question.findById(req.params.id);
  question.question = body.question;
  question.description = body.description;
  question.isApproved = true;
  await question.save();
  res.json(question.toJSON());
});

questionsRouter.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: 'Aradığınız soru bulunamadı.',
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
      error: 'Sileceğiniz soru idsi eksik',
    });
  }
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = questionsRouter;
