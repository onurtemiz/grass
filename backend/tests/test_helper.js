const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const User = require('../models/user');
const Teacher = require('../models/teacher');

const lessons = [
  {
    areaCode: 'PSY',
    digitCode: '101',
    teacher: 'MEHMET AGA',
    sectionCode: '01',
  },
  {
    areaCode: 'PSY',
    digitCode: '101',
    teacher: 'YUSUF AGA',
    sectionCode: '02',
  },
  {
    areaCode: 'PSY',
    digitCode: '104',
    teacher: 'BARIS',
    sectionCode: '03',
  },
  {
    areaCode: 'PSY',
    digitCode: '101',
    teacher: 'TARIH',
    sectionCode: '04',
  },
  {
    areaCode: 'PSY',
    digitCode: '101',
    teacher: 'SARI CIZME',
    sectionCode: '04',
  },
];

const loginUser = async (u) => {
  const user = await api.post('/api/login').send(u);
  return user.body;
};

const signupUser = async (u) => {
  const user = await api.post('/api/users/signup').send(u);
  return user.body;
};

const signupAndLoginUser = async (u) => {
  const signupUser = await signupUser(u);
  const loggedInUser = await loginUser(u.email, u.password);
  return loggedInUser.body;
};

const createFakeUsers = async (count) => {
  for (i = 0; i < count; i++) {
    let u = {
      email: `o${i}@boun.edu.tr`,
      password: '123456789',
      username: `onur${i}`,
    };
    await signupUser(u);
  }
};

const createFakeComments = async (count, teacherId, lessonId, user) => {
  for (let i = 0; i < count; i++) {
    await api
      .post('/api/comments')
      .send({ comment: `comment ${i}`, teacherId, lessonId })
      .set('Authorization', `bearer ${user.token}`);
  }
};

const createFakeDb = async () => {
  for (let i = 0; i < lessons.length; i++) {
    await api.post('/api/lessons/').send(lessons[i]);
    await api.post('/api/lessons/').send({ ...lessons[i], digitCode: '201' });
    await api.post('/api/lessons/').send({ ...lessons[i], digitCode: '301' });
    await api.post('/api/lessons/').send({ ...lessons[i], digitCode: '401' });
    await api.post('/api/lessons/').send({
      ...lessons[i],
      areaCode: 'HIST',
      teacher: `${lessons[i].teacher} TARIH`,
    });
    await api.post('/api/lessons/').send({
      ...lessons[i],
      areaCode: 'HIST',
      digitCode: '201',
      teacher: `${lessons[i].teacher} TARIH`,
    });
    await api.post('/api/lessons/').send({
      ...lessons[i],
      areaCode: 'HIST',
      digitCode: '301',
      teacher: `${lessons[i].teacher} TARIH`,
    });

    await api.post('/api/lessons/').send({
      ...lessons[i],
      areaCode: 'FLED',
      teacher: `${lessons[i].teacher} EF`,
    });
  }
};

module.exports = {
  signupAndLoginUser,
  createFakeUsers,
  createFakeComments,
  signupUser,
  loginUser,
  createFakeDb,
};
