const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Club = require('../models/club');
const Question = require('../models/question');
const Dorm = require('../models/dorm');
const Campus = require('../models/campus');

usersRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const isEmailDuplicate = await User.findOne({ email: body.email });
  const isUserDuplicate = await User.findOne({ username: body.username });
  const reResult = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);
  if (!body.email || reResult === null) {
    return res.status(400).json({
      error: 'Must have boun email',
    });
  } else if (isEmailDuplicate != null) {
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

usersRouter.get('/following', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({
      error: 'user not found',
    });
  }
  const clubs = await Club.find({ _id: { $in: user.following } });
  const questions = await Question.find({ _id: { $in: user.following } });
  const dorms = await Dorm.find({ _id: { $in: user.following } });
  const campuses = await Campus.find({ _id: { $in: user.following } });
  const lessons = await Lesson.find({ _id: { $in: user.following } }).populate(
    'teacher'
  );
  const allFollowing = {
    clubs: clubs.map((c) => c.toJSON()),
    questions: questions.map((c) => c.toJSON()),
    dorms: dorms.map((c) => c.toJSON()),
    campuses: campuses.map((c) => c.toJSON()),
    lessons: lessons.map((l) => l.toJSON()),
  };
  res.json(allFollowing);
});

usersRouter.put('/follow', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  let isMalformatedId = false;
  try {
    let typeId = new mongoose.Types.ObjectId(body.id);
  } catch (e) {
    isMalformatedId = true;
  }
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  } else if (!body.id || isMalformatedId) {
    return res.status(400).json({
      error: 'id is missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  let isUserFollows = user.following.find((id) => id.toString() === body.id);

  if (isUserFollows) {
    user.following = user.following.filter((id) => id.toString() !== body.id);
  } else {
    user.following.push(body.id);
  }
  await user.save();
  res.status(200).end();
});

usersRouter.put('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  } else if (!body.currentPassword) {
    return res.status(401).json({
      error: 'current password must be present',
    });
  } else if (!body.password && !body.username) {
    return res.status(401).json({
      error: 'new password or username must be present',
    });
  }
  let user = await User.findById(decodedToken.id);
  const isPassSame = await bcrypt.compare(
    body.currentPassword,
    user.passwordHash
  );

  if (!isPassSame) {
    return res.status(401).json({
      error: 'current password is wrong.',
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
  user = await User.findById(decodedToken.id);

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

usersRouter.get('/admin', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  if (typeof user.isAdmin !== 'undefined' && user.isAdmin == true) {
    res.json({
      isAdmin: true,
    });
  } else {
    res.json({
      isAdmin: false,
    });
  }
});

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate({
    path: 'comments',
    populate: [{ path: 'lesson' }],
  });
  const jsonedUser = user.toJSON();
  const totalLikedUser = {
    ...jsonedUser,
    totalLikes:
      jsonedUser.comments.length !== 0
        ? jsonedUser.comments
            .map((c) =>
              c.likes.length !== 0
                ? c.likes.reduce(
                    (total, l) => (user.equals(l) ? total : (total += 1)),
                    0
                  )
                : 0
            )
            .reduce((total, c) => total + c)
        : 0,
  };
  res.json(totalLikedUser);
});

usersRouter.get('/', async (req, res) => {
  const q = req.query;

  if (!q.id) {
    return res.json({
      error: 'id must present',
    });
  }
  const user = await User.findById(q.id);

  if (!user) {
    return res.json({
      error: 'user not found',
    });
  }

  res.json(user.toJSON());
});

module.exports = usersRouter;
