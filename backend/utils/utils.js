const moment = require('moment');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const {
  passwordResetTemplate,
  emailVerificationTemplate,
} = require('./emailTemplates');

const getDayFilter = (daySort) => {
  if (daySort === 'today') {
    return {
      $gte: moment().subtract(1, 'days'),
    };
  } else if (daySort === 'lastWeek') {
    return {
      $gte: moment().subtract(7, 'days'),
    };
  } else if (daySort === 'lastMonth') {
    return {
      $gte: moment().subtract(30, 'days'),
    };
  } else {
    return {
      $lte: new Date().getTime(),
    };
  }
};

const transporter = nodemailer.createTransport({
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

const sendForgotPasswordEmail = async (user) => {
  user.passwordVerification = randomstring.generate();
  await user.save();

  const baseUrl =
    process.env.NODE_ENV !== 'dev'
      ? 'https://www.bouncim.com'
      : 'http://localhost:3000';
  const forgotPasswordLink = `${baseUrl}/reset_password?code=${user.passwordVerification}&u=${user._id}`;

  await transporter.sendMail({
    from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Boun Çim Şifre Sıfırlama', // Subject line
    html: passwordResetTemplate(user, forgotPasswordLink), // html body
  });
};

const sendActivationEmail = async (user) => {
  user.verifyToken = randomstring.generate();
  await user.save();
  const baseUrl =
    process.env.NODE_ENV !== 'dev'
      ? 'https://www.bouncim.com'
      : 'http://localhost:3000';
  const verificationLink = `${baseUrl}/verify?code=${user.verifyToken}&u=${user._id}`;
  await transporter.sendMail({
    from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Boun Çim Aktivasyon Linki', // Subject line
    html: emailVerificationTemplate(user, verificationLink), // html body
  });
};

const getDayFilterFuture = (daySort) => {
  if (daySort === 'today') {
    return {
      $gte: moment().startOf('day'),
      $lte: moment().endOf('day'),
    };
  } else if (daySort === 'nextWeek') {
    return {
      $gte: moment().startOf('week'),
      $lte: moment().endOf('week'),
    };
  } else if (daySort === 'nextMonth') {
    return {
      $gte: moment().startOf('month'),
      $lte: moment().endOf('month'),
    };
  } else {
    return {
      $ne: new Date(),
    };
  }
};

module.exports = {
  getDayFilter,
  getDayFilterFuture,
  sendActivationEmail,
  sendForgotPasswordEmail,
};
