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

describe('when wants to add single teacher', () => {
  test('should add if teacher does not exists', async () => {
    let t = {
      name: 'Yusuf Musuf',
    };
    await api.post('/api/teachers').send(t).expect(201);
    const teacher = await Teacher.findOne({ name: t.name });
    expect(teacher).toBeDefined();
    const total = await Teacher.countDocuments();
    expect(total).toEqual(1);
  });
  test('should not add if teacher does exists', async () => {
    let t = {
      name: 'Yusuf Musuf',
    };
    await api.post('/api/teachers').send(t).expect(201);
    await api.post('/api/teachers').send(t).expect(400);
    const teacher = await Teacher.findOne({ name: t.name });
    expect(teacher).toBeDefined();
    const total = await Teacher.countDocuments();
    expect(total).toEqual(1);
  });
});
