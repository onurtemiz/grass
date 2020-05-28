const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
});

beforeEach(async () => {
  await Teacher.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

test('should create 10 teachers and 10 lessons atteched to them', async () => {
  await helper.createFakeDb();
  const total = await Teacher.countDocuments();
  const totalL = await Lesson.countDocuments();
  const lessons = await Lesson.find({});
  expect(total).toEqual(15);
  expect(totalL).toEqual(40);
});
