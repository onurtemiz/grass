const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const Teacher = require('../models/teacher');

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

const createFakeDb = (teacherCount, lessonCount) => {
  const teacherNames = getRandomTeacherName(teacherCount);
  const lessons = getRandomLessonObj(lessonCount, teacherNames);
  return lessons;
};

const getRandomLessonObj = (count, teacherArr) => {
  let result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  for (let q = 0; q < teacherArr.length; q++) {
    for (let i = 0; i < count; i++) {
      let lesson = {
        sectionCode: '',
        digitCode: '',
        areaCode: '',
        teacher: `${teacherArr[q]}`,
      };
      for (let i = 0; i < 4; i++) {
        lesson.areaCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      for (let i = 0; i < 3; i++) {
        lesson.digitCode += numbers.charAt(
          Math.floor(Math.random() * numbers.length)
        );
      }
      for (let i = 0; i < 2; i++) {
        lesson.sectionCode += numbers.charAt(
          Math.floor(Math.random() * numbers.length)
        );
      }
      result.push(lesson);
    }
  }
  return result;
};

const getRandomTeacherName = (count, length = 10) => {
  let result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    let word = '';
    for (let i = 0; i < length; i++) {
      word += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result.push(word);
  }
  return result;
};

module.exports = { signupAndLoginUser, signupUser, loginUser, createFakeDb };
