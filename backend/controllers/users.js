const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

usersRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const isEmailDuplicate = await User.findOne({ email: body.email });
  const isUserDuplicate = await User.findOne({ username: body.username });
  const reResult = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);
  if (!body.email || reResult === null) {
    return res.status(400).json({
      error: 'Must have boun email',
    });
  } else if (isEmailDuplicate !== null) {
    return res.status(400).json({
      error: 'User is already signin',
    });
  } else if (!body.username || body.username.length > 15 || isUserDuplicate) {
    return res.status(400).json({
      error: 'Username must be present, unique and less than 15 characters',
    });
  } else if (!body.password || body.password.length < 8) {
    return res.status(400).json({
      error: 'Password must be present and 8 characters or more ',
    });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash: passwordHash,
  });
  await user.save();
  res.status(201).json(user.toJSON());
});

usersRouter.put('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }

  if (body.username) {
    const isUserDuplicate = await User.findOne({ username: body.username });
    if (body.username.length > 15 || isUserDuplicate) {
      return res.status(401).json({
        error: 'Username must be unique and less than 15 characters',
      });
    }
    await User.findByIdAndUpdate(decodedToken.id, { username: body.username });
  }
  if (body.password) {
    if (body.password.length < 8) {
      return res.status(401).json({
        error: 'password must be 8 or more characters',
      });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    await User.findByIdAndUpdate(decodedToken.id, {
      passwordHash: passwordHash,
    });
  }
  const user = await User.findById(decodedToken.id);

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({
    token,
    id: user._id,
    email: user.email,
    username: user.username,
  });
});

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate({
    path: 'comments',
    populate: [{ path: 'lesson' }],
  });
  const jsonedUser = user.toJSON();
  console.log('jsonedUser', jsonedUser);
  const totalLikedUser = {
    ...jsonedUser,
    totalLikes:
      jsonedUser.comments.length !== 0
        ? jsonedUser.comments
            .map((c) => c.likes.length)
            .reduce((total, c) => total + c)
        : 0,
  };
  res.json(totalLikedUser);
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
