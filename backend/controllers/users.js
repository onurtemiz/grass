const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Club = require('../models/club');
const Question = require('../models/question');
const Dorm = require('../models/dorm');
const Campus = require('../models/campus');
const Notification = require('../models/notification');
const Tip = require('../models/tip');

usersRouter.put('/modal', async (req, res) => {
  req.user.sawModal = true;
  await req.user.save();
  res.json(req.user.toJSON());
});

usersRouter.get('/following', async (req, res) => {
  const user = req.user;
  const clubs = await Club.find({ _id: { $in: user.following } });
  const questions = await Question.find({ _id: { $in: user.following } });
  const dorms = await Dorm.find({ _id: { $in: user.following } });
  const campuses = await Campus.find({ _id: { $in: user.following } });
  const lessons = await Lesson.find({ _id: { $in: user.following } });
  const allFollowing = {
    clubs: clubs.map((c) => c.toJSON()),
    questions: questions.map((c) => c.toJSON()),
    dorms: dorms.map((c) => c.toJSON()),
    campuses: campuses.map((c) => c.toJSON()),
    lessons: lessons.map((l) => l.toJSON()),
  };
  res.json(allFollowing);
});

usersRouter.put('/follow/:id', async (req, res) => {
  let isMalformatedId = false;
  try {
    let typeId = new mongoose.Types.ObjectId(req.params.id);
  } catch (e) {
    isMalformatedId = true;
  }
  if (!req.params.id || isMalformatedId) {
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
        select: ['digitCode', 'areaCode', 'parentName'],
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
  const jsonUser = user.toJSON();
  const totalLikedUser = await User.getTotalLike(user.username);

  res.status(200).json({
    token,
    ...jsonUser,
    ...totalLikedUser,
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

usersRouter.get('/achievement', async (req, res) => {
  const totalLikedUser = await User.getTotalLike(req.user.username);
  const likes = totalLikedUser.totalLikes;
  const comments = req.user.comments.length;
  const questions = await Question.find({
    user: req.user._id,
    isApproved: true,
  }).countDocuments();
  const tips = await Tip.find({
    isApproved: true,
    user: req.user._id,
  }).countDocuments();
  req.user.achievements = getAchievements(
    req.user,
    likes,
    comments,
    questions,
    tips
  );
  await req.user.save();
  res.json(req.user.achievements);
});

const getAchievements = (user, likes, comments, questions, tips) => {
  const achievements = {
    comment1: false,
    comment5: false,
    comment10: false,
    comment20: false,
    comment50: false,
    comment100: false,
    pati1: false,
    pati10: false,
    pati50: false,
    pati100: false,
    pati200: false,
    pati500: false,
    pati1000: false,
    tip1: false,
    tip10: false,
    question1: false,
    question10: false,
    betaTester: false,
    mod: false,
    admin: false,
  };
  handleTips(tips, achievements);
  handleComments(comments, achievements);
  handleQuestions(questions, achievements);
  handlePatis(likes, achievements);
  handleExtras(user, achievements);
  return achievements;
};

usersRouter.put('/icon', async (req, res) => {
  if (req.user.achievements[`${req.query.iconCode}`]) {
    req.user.iconName = req.query.name;
    await req.user.save();
  }
  res.end();
});

usersRouter.get('/:username', async (req, res) => {
  const totalLikedUser = await User.getTotalLike(req.params.username);

  res.json(totalLikedUser);
});

// usersRouter.get('/', async (req, res) => {
//   const q = req.query;

//   if (!q.id) {
//     return res.json({
//       error: 'Onur bir şeyleri batırdı. Hata kodu 2',
//     });
//   }
//   const user = await User.findById(q.id);

//   if (!user) {
//     return res.json({
//       error: 'Aradığınız kullanıcı bulunamadı.',
//     });
//   }

//   res.json(user.toJSON());
// });

module.exports = usersRouter;
function handleExtras(user, achievements) {
  if (user.userStatus === 'admin') {
    achievements.admin = true;
  } else if (user.userStatus === 'mod') {
    achievements.mod = true;
  }
  if (user.extras) {
    achievements.betaTester = true;
  }
}

function handlePatis(likes, achievements) {
  if (likes >= 1000) {
    achievements.pati1000 = true;
    achievements.pati500 = true;
    achievements.pati200 = true;
    achievements.pati100 = true;
    achievements.pati50 = true;
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 500) {
    achievements.pati500 = true;
    achievements.pati200 = true;
    achievements.pati100 = true;
    achievements.pati50 = true;
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 200) {
    achievements.pati200 = true;
    achievements.pati100 = true;
    achievements.pati50 = true;
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 100) {
    achievements.pati100 = true;
    achievements.pati50 = true;
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 50) {
    achievements.pati50 = true;
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 10) {
    achievements.pati10 = true;
    achievements.pati1 = true;
  } else if (likes >= 1) {
    achievements.pati1 = true;
  }
}

function handleQuestions(questions, achievements) {
  if (questions >= 10) {
    achievements.question10 = true;
    achievements.question1 = true;
  } else if (questions >= 1) {
    achievements.question1 = true;
  }
}

function handleComments(comments, achievements) {
  if (comments >= 100) {
    achievements.comment100 = true;
    achievements.comment50 = true;
    achievements.comment20 = true;
    achievements.comment10 = true;
    achievements.comment5 = true;
    achievements.comment1 = true;
  } else if (comments >= 50) {
    achievements.comment50 = true;
    achievements.comment20 = true;
    achievements.comment10 = true;
    achievements.comment5 = true;
    achievements.comment1 = true;
  } else if (comments >= 20) {
    achievements.comment20 = true;
    achievements.comment10 = true;
    achievements.comment5 = true;
    achievements.comment1 = true;
  } else if (comments >= 10) {
    achievements.comment10 = true;
    achievements.comment5 = true;
    achievements.comment1 = true;
  } else if (comments >= 5) {
    achievements.comment5 = true;
    achievements.comment1 = true;
  } else if (comments >= 1) {
    achievements.comment1 = true;
  }
}

function handleTips(tips, achievements) {
  if (tips >= 10) {
    achievements.tip10 = true;
    achievements.tip1 = true;
  } else if (tips >= 1) {
    achievements.tip1 = true;
  }
}
