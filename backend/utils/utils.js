const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const User = require('../models/user');
const Comment = require('../models/comment');
const Tip = require('../models/tip');
const Question = require('../models/question');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, async function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      await callback(null, html);
    }
  });
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

  await readHTMLFile(
    __dirname + '/../pass-reset-template.html',
    async function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        username: user.username,
        reset_url: forgotPasswordLink,
      };
      const htmlToSend = template(replacements);

      await transporter.sendMail({
        from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Boun Çim Şifre Sıfırlama', // Subject line
        html: htmlToSend, // html body
      });
    }
  );
};

const sendActivationEmail = async (user) => {
  user.verifyToken = randomstring.generate();
  await user.save();
  const baseUrl =
    process.env.NODE_ENV !== 'dev'
      ? 'https://www.bouncim.com'
      : 'http://localhost:3000';
  const verificationLink = `${baseUrl}/verify?code=${user.verifyToken}&u=${user._id}`;

  await readHTMLFile(__dirname + '/../verify-template.html', async function (
    err,
    html
  ) {
    var template = handlebars.compile(html);
    var replacements = {
      username: user.username,
      verify_url: verificationLink,
    };
    const htmlToSend = template(replacements);

    await transporter.sendMail({
      from: '"Boun Çim" <iletisim@bouncim.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Boun Çim Aktivasyon Linki', // Subject line
      html: htmlToSend, // html body
    });
  });
};

const getUserAchievements = async (user) => {
  const totalLikedUser = await User.getTotalLike(user.username);
  const likes = totalLikedUser.totalLikes;
  const comments = user.comments.length;
  const questions = await Question.find({
    user: user._id,
    isApproved: true,
  }).countDocuments();
  const tips = await Tip.find({
    isApproved: true,
    user: user._id,
  }).countDocuments();
  const achievements = await getAchievements(
    user,
    likes,
    comments,
    questions,
    tips
  );
  return achievements;
};

const getAchievements = async (user, likes, comments, questions, tips) => {
  const achievements = user.achievements;
  handleTips(tips, achievements);
  handleComments(comments, achievements);
  handleQuestions(questions, achievements);
  handlePatis(likes, achievements);
  await handleExtras(user, achievements);
  return achievements;
};

async function handleExtras(user, achievements) {
  achievements.admin = user.userStatus === 'admin' ? true : false;
  achievements.mod = user.userStatus === 'mod' ? true : false;
  const comment = await Comment.findOne({ user: user._id });
  achievements.betaTester =
    comment && new Date(user.created) < new Date(2020, 8, 15);
  achievements.patreon = user.achievements.patreon;
}

function handlePatis(likes, achievements) {
  achievements.pati1 = likes >= 1 ? true : false;
  achievements.pati10 = likes >= 10 ? true : false;
  achievements.pati20 = likes >= 20 ? true : false;
  achievements.pati50 = likes >= 50 ? true : false;
  achievements.pati100 = likes >= 100 ? true : false;
  achievements.pati200 = likes >= 200 ? true : false;
  achievements.pati500 = likes >= 500 ? true : false;
  achievements.pati1000 = likes >= 1000 ? true : false;
}

function handleQuestions(questions, achievements) {
  achievements.question1 = questions >= 1 ? true : false;
  achievements.question5 = questions >= 5 ? true : false;
  achievements.question10 = questions >= 10 ? true : false;
}

function handleComments(comments, achievements) {
  achievements.comment1 = comments >= 1 ? true : false;
  achievements.comment5 = comments >= 5 ? true : false;
  achievements.comment10 = comments >= 10 ? true : false;
  achievements.comment20 = comments >= 20 ? true : false;
  achievements.comment50 = comments >= 50 ? true : false;
  achievements.comment100 = comments >= 100 ? true : false;
}

function handleTips(tips, achievements) {
  achievements.tip1 = tips >= 1 ? true : false;
  achievements.tip5 = tips >= 5 ? true : false;
  achievements.tip10 = tips >= 10 ? true : false;
}

module.exports = {
  sendActivationEmail,
  sendForgotPasswordEmail,
  getUserAchievements,
};
