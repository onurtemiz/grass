const signupRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const blacklist = require('../blacklistv2.json');
const rateLimit = require('express-rate-limit');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const utils = require('../utils/utils');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 100 requests per windowMs
  message: { error: 'Lütfen 1 saat sonra tekrar deneyin.' },
});

signupRouter.use(limiter);

signupRouter.post('/reset_password', async (req, res) => {
  const user = await User.findOne({
    $and: [{ _id: req.query.u }, { passwordVerification: req.query.code }],
  });
  if (!user) {
    res.status(400).json({
      error: 'Geçersiz Link',
    });
  }
  const body = req.body;
  if (body.password.trim().length < 8) {
    return res.status(400).json({
      error: 'Yeni şifreniz 8 veya daha çok karakterden oluşmalı.',
    });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  user.passwordHash = passwordHash;
  user.passwordVerification = randomstring.generate();
  user.verified =true;
  await user.save();
  res.end();
});

signupRouter.post('/forgot_password', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    res.status(400).json({
      error: 'Böyle bir kullanıcı bulunamadı',
    });
  }
  await utils.sendForgotPasswordEmail(user);

  res.end();
});

signupRouter.post('/send_verification', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    res.status(400).json({
      error: 'Eposta bulunamadı',
    });
  }
  await utils.sendActivationEmail(user);
  res.end();
});

signupRouter.post('/verify', async (req, res) => {
  const user = await User.findOne({
    $and: [{ verifyToken: req.query.verifyToken }, { _id: req.query.u }],
  });
  if (!user) {
    res.status(400).json({
      error: 'Kullanıcı ile token eşleşmiyor',
    });
  }
  user.verified = true;
  user.verifyToken = randomstring.generate();
  await user.save();
  res.end();
});

signupRouter.post('/', async (req, res) => {
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
  } else if (inBanList(body.email)) {
    return res.status(400).json({
      error: 'Site sadece Boğaziçi Öğrencilerine açıktır.',
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

  await utils.sendActivationEmail(user);

  res.end();
});

module.exports = signupRouter;

const inBanList = (email) => {
  return blacklist.find((b) => b === email);
};
