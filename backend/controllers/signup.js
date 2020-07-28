const signupRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const blacklist = require('../blacklistv2.json');
const rateLimit = require('express-rate-limit');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 100 requests per windowMs
  message: { error: 'Lütfen 15 dakika sonra tekrar deneyin.' },
});

signupRouter.use(limiter);

signupRouter.post('/change_password', async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user || user.passwordVerification !== req.query.code) {
    res.status(400).json({
      error: 'Geçersiz Aktivitasyon',
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
  user.passwordVerification = '';
  await user.save();
  res.end();
});

signupRouter.post('/reset_password', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    res.status(400).json({
      error: 'Böyle bir kullanıcı bulunamadı',
    });
  }
  user.passwordVerification = randomstring.generate();
  await user.save();

  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'iletisim@bouncim.com', // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const verificationLink = `https://www.bouncim.com/change_password?code=${user.passwordVerification}&id=${user._id}`;

  await transporter.sendMail({
    from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
    to: body.email, // list of receivers
    subject: 'Boun Çim Şifre Sıfırlama', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${verificationLink}">Sıfırla</a>`, // html body
  });

  res.end();
});

signupRouter.post('/verify/:verifyToken', async (req, res) => {
  const user = await User.findOne({ verifyToken: req.params.verifyToken });
  if (!user) {
    res.status(400).json({
      error: 'Kullanıcı ile token eşleşmiyor',
    });
  }
  user.verified = true;
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
    verifyToken: randomstring.generate(),
  });

  await user.save();
  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'iletisim@bouncim.com', // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const verificationLink = `https://www.bouncim.com/verify?code=${user.verifyToken}`;

  await transporter.sendMail({
    from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
    to: body.email, // list of receivers
    subject: 'Boun Çim Aktivasyon Linki', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${verificationLink}">Onayla</a>`, // html body
  });

  res.end();
});

module.exports = signupRouter;

const inBanList = (email) => {
  return blacklist.find((b) => b === email);
};
