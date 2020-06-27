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
const Notification = require('../models/notification');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

usersRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const reResult = body.email.match(/^[A-Z0-9._%+-]+@boun.edu.tr$/i);

  if (!body.email || reResult === null) {
    return res.status(400).json({
      error: 'Eposta adresi boun uzantılı olmalı.',
    });
  } else if (!body.password || body.password.trim().length < 8) {
    return res.status(400).json({
      error: 'Şifre 8 veya daha fazla karakterden oluşmalı.',
    });
  } else if (
    !body.username ||
    body.username.trim().length > 15 ||
    body.username.trim().length === 0 ||
    body.username.trim().length !== body.username.length
  ) {
    return res.status(400).json({
      error: 'Kullanıcı adı 15 veya daha az karakterden oluşmalı.',
    });
  }
  const isEmailOrUsernameDuplicate = await User.findOne({
    $or: [{ email: body.email }, { username: body.username }],
  });
  if (isEmailOrUsernameDuplicate) {
    return res.status(400).json({
      error: 'Bu kullanıcı adı ya da eposta daha önceden alınmış.',
    });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash: passwordHash,
  });
  await user.save();
  res.status(201).json(user.toJSONMain());
});

usersRouter.use(middleware.authUser);

usersRouter.get('/following', async (req, res) => {
  const user = req.user;
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
  let isMalformatedId = false;
  try {
    let typeId = new mongoose.Types.ObjectId(body.id);
  } catch (e) {
    isMalformatedId = true;
  }
  if (!body.id || isMalformatedId) {
    return res.status(400).json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 1',
    });
  }

  const user = req.user;
  let isUserFollows = user.following.find((id) => id.toString() === body.id);

  if (isUserFollows) {
    user.following = user.following.filter((id) => id.toString() !== body.id);
  } else {
    user.following.push(body.id);
  }
  await user.save();
  res.status(200).end();
});

usersRouter.get('/notifications', async (req, res) => {
  const notifications = await Notification.find({ target: req.user._id })
    .populate({ path: 'responsible', select: 'username' })
    .populate({
      path: 'tool',
      populate: {
        path: 'lesson',
        select: ['digitCode', 'areaCode'],
        populate: { path: 'teacher', select: 'name' },
      },
    })
    .populate({
      path: 'tool',
      populate: { path: 'club', select: 'name' },
    })
    .populate({
      path: 'tool',
      populate: { path: 'dorm', select: 'name' },
    })
    .populate({
      path: 'tool',
      populate: { path: 'campus', select: 'name' },
    });

  res.json(notifications.map((n) => n.toJSON()));
});

usersRouter.delete('/notifications', async (req, res) => {
  await Notification.deleteMany({ target: req.user._id });
  res.status(204).end();
});

usersRouter.put('/', async (req, res) => {
  const body = req.body;

  if (!body.currentPassword) {
    return res.status(400).json({
      error: 'Şu anki şifrenizi girmelisiniz.',
    });
  } else if (!body.password && !body.username) {
    return res.status(400).json({
      error: 'Yeni bir şifre veya bir kullanıcı adı girmelisiniz.',
    });
  }
  let user = req.user;
  const isPassSame = await bcrypt.compare(
    body.currentPassword,
    user.passwordHash
  );

  if (!isPassSame) {
    return res.status(401).json({
      error: 'Şu anki şifrenizi yanlış girdiniz.',
    });
  }

  if (body.username) {
    const isUserDuplicate = await User.findOne({ username: body.username });
    if (isUserDuplicate) {
      return res.status(400).json({
        error: 'Yeni kullanıcı adınız başkası tarafından alınmış.',
      });
    }
    if (
      body.username.length > 15 ||
      body.username.trim().length === 0 ||
      body.username.trim().length !== body.username.length
    ) {
      return res.status(400).json({
        error: 'Yeni kullanıcı adınız 15 karakter veya daha az olmalı.',
      });
    }
    await User.findByIdAndUpdate(user._id, { username: body.username });
  }
  if (body.password) {
    if (body.password.trim().length < 8) {
      return res.status(400).json({
        error: 'Yeni şifreniz 8 veya daha çok karakterden oluşmalı.',
      });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    await User.findByIdAndUpdate(user._id, {
      passwordHash: passwordHash,
    });
  }
  user = await User.findById(user._id);

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  const jsonUser = user.toJSONMain();
  res.status(200).json({
    token,
    ...jsonUser,
  });
});

usersRouter.get('/admin', async (req, res) => {
  const user = req.user;
  if (user.userStatus === 'admin') {
    res.json({
      isAdmin: true,
    });
  } else {
    res.json({
      isAdmin: false,
    });
  }
});

usersRouter.get('/mainuser', async (req, res) => {
  const totalLikedUser = await User.getTotalLike(req.user.username);
  const jsonedUser = req.user.toJSON();
  let user = {
    ...jsonedUser,
    ...totalLikedUser,
  };
  res.json(user);
});

usersRouter.put('/icon', async (req, res) => {
  req.user.iconName = req.query.name;
  await req.user.save();
  res.end();
});

usersRouter.get('/:username', async (req, res) => {
  const totalLikedUser = await User.getTotalLike(req.params.username);

  res.json(totalLikedUser);
});

usersRouter.get('/', async (req, res) => {
  const q = req.query;

  if (!q.id) {
    return res.json({
      error: 'Onur bir şeyleri batırdı. Hata kodu 2',
    });
  }
  const user = await User.findById(q.id);

  if (!user) {
    return res.json({
      error: 'Aradığınız kullanıcı bulunamadı.',
    });
  }

  res.json(user.toJSON());
});

module.exports = usersRouter;
