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
  await helper.createFakeDb();
});

afterAll(() => {
  mongoose.connection.close();
});

const baseUrl = '/api/all';

describe('when requesting total', () => {
  test('should get total lessons if no search param presents', async () => {
    const total = await api.get(`${baseUrl}/total`).expect(200);
    expect(total.body.total).toEqual(40);
  });

  test('should get total if lesson name presents in param', async () => {
    const totalPsy = await api.get(`${baseUrl}/total?search=psy`).expect(200);
    expect(totalPsy.body.total).toEqual(20);

    const totalFled = await api.get(`${baseUrl}/total?search=fled`).expect(200);
    expect(totalFled.body.total).toEqual(5);
  });

  test('should get total if teacher name presents in param', async () => {
    const totalAga = await api.get(`${baseUrl}/total?search=aga`).expect(200);
    expect(totalAga.body.total).toEqual(16);
    const totalBaris = await api
      .get(`${baseUrl}/total?search=BARIS`)
      .expect(200);
    expect(totalBaris.body.total).toEqual(8);
    const totalMehmet = await api
      .get(`${baseUrl}/total?search=mehmet`)
      .expect(200);
    expect(totalMehmet.body.total).toEqual(8);
  });

  test('should get total if teacher name and lesson name presents in param', async () => {
    const totalS = await api.get(`${baseUrl}/total?search=s`).expect(200);
    expect(totalS.body.total).toEqual(38);
  });
});

describe('when get all data', () => {
  test('should get all lessons if no search presents', async () => {
    const totalLessons = await api.get(`${baseUrl}/total`).expect(200);
    const res = await api
      .get(`${baseUrl}?total=${totalLessons.body.total}&start=0`)
      .expect(200);
    expect(res.body).toHaveLength(40);
  });

  test('should get first 20 lessons if no search presents', async () => {
    const totalLessons = await api.get(`${baseUrl}/total`).expect(200);
    const res = await api
      .get(`${baseUrl}?total=${totalLessons.body.total}&start=0`)
      .expect(200);

    expect(res.body).toHaveLength(20);
  });

  test('should get 20 lessons when start is specified', async () => {
    const totalLessons = await api.get(`${baseUrl}/total`).expect(200);
    const res = await api
      .get(`${baseUrl}?total=${totalLessons.body.total}&start=20`)
      .expect(200);
    expect(res.body).toHaveLength(20);
  });

  test.only('should get no lesson if start exceeds total and no search is specified', async () => {
    const totalLessons = await api.get(`${baseUrl}/total`).expect(200);
    const res = await api
      .get(
        `${baseUrl}?total=${totalLessons.body.total}&start=${totalLessons.body.total}`
      )
      .expect(200);
    expect(res.body).toHaveLength(0);
  });
});
