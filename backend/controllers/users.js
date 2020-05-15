const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../utils/config');

usersRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const isDuplicate = await User.findOne({ email: body.email });
  const reResult = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);
  console.log('reResult', isDuplicate);
  if (!body.email || reResult === null) {
    return res.status(400).json({
      error: 'Must have boun email',
    });
  } else if (isDuplicate !== null) {
    return res.status(400).json({
      error: 'User is already signin',
    });
  } else if (!body.firstName || body.firstName.length > 15) {
    return res.status(400).json({
      error: 'First name must be present and less than 15 characters',
    });
  } else if (!body.lastName || body.lastName.length > 15) {
    return res.status(400).json({
      error: 'Last name must be present and less than 15 characters',
    });
  } else if (!body.password || body.password.length < 8) {
    return res.status(400).json({
      error: 'Password must be present and 8 characters or more ',
    });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    passwordHash: passwordHash,
  });
  await user.save();
  res.status(201).json(user.toJSON());
});

usersRouter.get('/', async (req, res) => {
  const key = process.env.API_KEY;
  if (!('key' in req.query) || key !== req.query.key) {
    return res.status(400).json({
      error: 'key must be present and right',
    });
  }
  const users = await User.find({}).populate('comments');
  res.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
