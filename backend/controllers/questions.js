const questionsRouter = require('express').Router();
const Question = require('../models/question');
const middleware = require('../utils/middleware');
const User = require('../models/user');

// questionsRouter.get('/refresh', async (req, res) => {
//   const questions = await Question.find();
//   for (let i = 0; i < questions.length; i++) {
//     questions[i].commentsLength = questions[i].comments.length;
//     await questions[i].save();
//   }
//   res.end();
// });

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
    user: req.user._id,
  });
  await question.save();
  res.json(question.toJSON());
});

questionsRouter.get('/all', middleware.authAdmin, async (req, res) => {
  const questions = await Question.find();
  res.json(questions.map((q) => q.toJSON()));
});

questionsRouter.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id).populate('comments');
  return res.json(question.toJSON());
});

questionsRouter.get('/', async (req, res) => {
  const q = req.query;
  if (!('start' in q) || !('total' in q) || !('filter' in q)) {
    res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 3',
    });
  }
  const search = q.search ? q.search : '';
  let popular = false;
  let sort = -1;

  if (q.filter === 'mostPopular') {
    popular = true;
  } else if (q.filter === 'mostPast') {
    sort = 1;
  }
  const questions = await Question.getFilteredInf(
    { sort, popular },
    search,
    q.start,
    q.total
  );

  const jsonQuestions = questions.map((q) => q.toJSON());
  const total = await Question.find({
    $and: [
      { isApproved: true },
      { question: { $regex: search, $options: 'i' } },
    ],
  }).countDocuments();
  res.json({ questions: jsonQuestions, total: total });
});

questionsRouter.use(middleware.authAdmin);

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
