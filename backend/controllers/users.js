const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Club = require('../models/club');
const Question = require('../models/question');
const Course = require('../models/course');
const Dorm = require('../models/dorm');
const Campus = require('../models/campus');
const Notification = require('../models/notification');
const Tip = require('../models/tip');
const utils = require('../utils/utils');

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
  let isUserFollows = user.following.find(
    (id) => id.toString() === req.params.id
  );

  if (isUserFollows) {
    user.following = user.following.filter(
      (id) => id.toString() !== req.params.id
    );
  } else {
    user.following.push(req.params.id);
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
        select: ['digitCode', 'areaCode', 'parentName', 'name'],
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
    })
    .populate({
      path: 'tool',
      populate: { path: 'question', select: 'question' },
    });

  res.json(notifications.map((n) => n.toJSON()));
});

usersRouter.put('/notifications/seen', async (req, res) => {
  const q = req.query;
  if (q.id) {
    await Notification.findByIdAndUpdate(q.id, { seen: true });
  }
  res.status(200).end();
});

usersRouter.delete('/notifications', async (req, res) => {
  const q = req.query;
  if (q.all === 'true') {
    await Notification.deleteMany({ target: req.user._id });
  } else {
    await Notification.findByIdAndDelete(q.id);
  }
  res.status(204).end();
});

usersRouter.post('/quota/follow', async (req, res) => {
  const q = req.query;
  const user = req.user;

  const isFollowing = user.followingCourses.some((u) => u.equals(q.courseId));

  if (isFollowing) {
    user.followingCourses = user.followingCourses.filter(
      (c) => !c.equals(q.courseId)
    );
  } else {
    user.followingCourses.push(q.courseId);
  }
  await user.save();

  res.status(200).end();
});

usersRouter.post('/depsem_info/update', async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (body.semester > 9 || body.semester < 1) {
    return res.status(400).json({
      error: 'Dönem 1 ile 9 arası olabilir.',
    });
  } else if (!body.quotaNotifications) {
    return res.status(400).json({
      error: 'Bildirim Seçenekleri Eksik',
    });
  } else if (body.departments.length > 2 || body.departments.length < 1) {
    return res.status(400).json({
      error: '1 ya da 2 Bölüm seçebilirsiniz.',
    });
  }
  const departments = [
    'Batı Dilleri ve Edebiyatları',
    'Bilgisayar Mühendisliği',
    'Bilgisayar ve Öğretim Teknolojileri Öğretmenliği',
    'Çeviribilim',
    'Dilbilim',
    'Ekonomi',
    'Elektrik Elektronik Mühendisliği',
    'Endüstri Mühendisliği',
    'Felsefe',
    'Fen Bilgisi Öğretmenliği',
    'Fizik',
    'Fizik Öğretmenliği',
    'İlköğretim Matematik Öğretmenliği',
    'İngilizce Öğretmenliği',
    'İnşaat Mühendisliği',
    'İşletme',
    'Kimya',
    'Kimya Öğretmenliği',
    'Makina Mühendisliği',
    'Matematik',
    'Matematik Öğretmenliği',
    'Moleküler Biyololik ve Genetik',
    'Okul Öncesi Öğretmenliği',
    'Psikoloji',
    'Rehberlik ve Psikolojik Danışmanlık',
    'Siyaset Bilimi ve Uluslararası İlişkiler',
    'Sosyoloji',
    'Tarih',
    'Turizm İşletmeciliği',
    'Türk Dili ve Edebiyatı',
    'Uluslararası Ticaret',
    'Yönetim Bilişim Sistemleri',
  ];
  for (let i = 0; i < body.departments.length; i++) {
    if (!departments.includes(body.departments[i])) {
      return res.status(400).json({
        error: 'Girilen bölümler uygun değil.',
      });
    }
  }

  user.departments = body.departments;
  user.semester = body.semester;
  user.quotaNotifications = body.quotaNotifications;
  await user.save();

  const userForToken = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const jsonedUser = user.toJSON();
  const totalLikedUser = await User.getTotalLike(user.username);

  res.status(200).json({
    token,
    ...jsonedUser,
    ...totalLikedUser,
  });
});

usersRouter.get('/achievement/get', async (req, res) => {
  res.json({ icons });
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
    let re = new RegExp('[a-zA-Z0-9._-]+');

    if (
      body.username.length > 15 ||
      body.username.trim().length === 0 ||
      body.username.trim().length !== body.username.length
    ) {
      return res.status(400).json({
        error:
          'Yeni kullanıcı adınız sadece 15 karakter veya daha az olabilir.',
      });
    }
    if (re.exec(body.username)[0] !== body.username) {
      return res.status(400).json({
        error:
          'Kullanıcı adınız sadece harf, sayı ya da ._- karakterlerini içerebilir.',
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
  const achievements = await utils.getUserAchievements(req.user);

  await User.updateOne({ _id: req.user._id }, { achievements });
  res.json(req.user.achievements);
});

usersRouter.put('/icon', async (req, res) => {
  if (req.user.achievements[`${req.query.iconCode}`] == true) {
    const icon = icons.find((i) => i.achievement === req.query.iconCode);
    req.user.iconName = icon.name;
    await req.user.save();
  }
  res.end();
});

usersRouter.get('/u/:username', async (req, res) => {
  const totalLikedUser = await User.getTotalLike(req.params.username);
  const user = await User.findOne({ username: req.params.username });
  const achievements = await utils.getUserAchievements(user);
  res.json({ ...totalLikedUser, achievements });
});

module.exports = usersRouter;

const icons = [
  {
    name: 'chess pawn',
    description: 'İlk yorumunu yaptın!',
    achievement: 'comment1',
  },
  {
    name: 'chess bishop',
    description: '5 yorum yaptın!',
    achievement: 'comment5',
  },
  {
    name: 'chess knight',
    description: '10 yorum yaptın!',
    achievement: 'comment10',
  },
  {
    name: 'chess rock',
    description: '20 yorum yaptın!',
    achievement: 'comment20',
  },
  {
    name: 'chess king',
    description: '50 yorum yaptın!',
    achievement: 'comment50',
  },
  {
    name: 'chess queen',
    description: '100 yorum yaptın!',
    achievement: 'comment100',
  },

  {
    name: 'bolt',
    description: 'İlk kez patilendin!',
    achievement: 'pati1',
  },
  {
    name: 'paper plane',
    description: '10 kez patilendin!',
    achievement: 'pati10',
  },
  {
    name: 'plane',
    description: '50 kez patilendin!',
    achievement: 'pati50',
  },
  {
    name: 'fighter jet',
    description: '100 kez patilendin!',
    achievement: 'pati100',
  },
  {
    name: 'space shuttle',
    description: '200 kez patilendin!',
    achievement: 'pati200',
  },
  {
    name: 'rocket',
    description: '500 kez patilendin!',
    achievement: 'pati500',
  },
  {
    name: 'quidditch',
    description: '1000 kez patilendin!',
    achievement: 'pati1000',
  },

  {
    name: 'leaf',
    description: 'İlk tavsiyeni verdin!',
    achievement: 'tip1',
  },
  {
    name: 'tree',
    description: '10 tavsive verdin!',
    achievement: 'tip10',
  },
  {
    name: 'gem',
    description: 'İlk sorunu sordun!',
    achievement: 'question1',
  },
  {
    name: 'tint',
    description: '10 soru sordun!',
    achievement: 'question10',
  },
  { name: 'cogs', description: 'Beta Tester', achievement: 'betaTester' },
  { name: 'shield', description: 'Moderatör', achievement: 'mod' },
  { name: 'user secret', description: 'Admin', achievement: 'admin' },
];
