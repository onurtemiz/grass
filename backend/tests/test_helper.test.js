const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Comment = require('../models/comment');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await User.deleteMany({});
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
  await Comment.deleteMany({});
});

beforeEach(async () => {
  await User.deleteMany({});
  await Lesson.deleteMany({});
  await Comment.deleteMany({});
  await Teacher.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
  await Comment.deleteMany({});
  mongoose.connection.close();
});

test('should create 25 comments by 5 users', async () => {
  await helper.createFakeDb();
  await helper.createFakeUsers(5);
  const teacher = await Teacher.findOne({});
  const lesson = await Lesson.findOne({ teacher: teacher._id });

  for (let i = 0; i < 5; i++) {
    let user = await helper.loginUser({
      email: `o${i}@boun.edu.tr`,
      password: '123456789',
    });
    await helper.createFakeComments(5, teacher._id, lesson._id, user);
  }
  let totalComments = await Comment.find().countDocuments();
  expect(totalComments).toEqual(25);
});

test('should create 5 fake users', async () => {
  let userTotal = await User.find().countDocuments();
  expect(userTotal).toEqual(0);
  await helper.createFakeUsers(5);
  userTotal = await User.find().countDocuments();
  expect(userTotal).toEqual(5);
});

test('should create 10 teachers and 10 lessons atteched to them', async () => {
  await helper.createFakeDb();
  const total = await Teacher.countDocuments();
  const totalL = await Lesson.countDocuments();
  const lessons = await Lesson.find({});
  expect(total).toEqual(15);
  expect(totalL).toEqual(40);
});
