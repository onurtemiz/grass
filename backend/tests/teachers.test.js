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

afterAll(() => {
  mongoose.connection.close();
});

const baseUrl = '/api/teachers';

describe('when wants to add single teacher', () => {
  beforeEach(async () => {
    await Teacher.deleteMany({});
  });
  test('should add if teacher does not exists', async () => {
    let t = {
      name: 'Yusuf Musuf',
    };
    await api.post(`${baseUrl}`).send(t).expect(201);
    const teacher = await Teacher.findOne({ name: t.name });
    expect(teacher).toBeDefined();
    const total = await Teacher.countDocuments();
    expect(total).toEqual(1);
  });
  test('should not add if teacher does exists', async () => {
    let t = {
      name: 'Yusuf Musuf',
    };
    await api.post(`${baseUrl}`).send(t).expect(201);
    await api.post(`${baseUrl}`).send(t).expect(400);
    const teacher = await Teacher.findOne({ name: t.name });
    expect(teacher).toBeDefined();
    const total = await Teacher.countDocuments();
    expect(total).toEqual(1);
  });

  test('should give error if no teacher name presents', async () => {
    const res = await api.post(`${baseUrl}`).expect(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('when total teachers wanted', () => {
  beforeAll(async () => {
    await helper.createFakeDb();
  });
  afterAll(async () => {
    await Teacher.deleteMany({});
  });
  test('should get total teachers if no result presents', async () => {
    const res = await api.get(`${baseUrl}/total`).expect(200);
    expect(res.body.total).toEqual(15);
  });

  test('should get total if name specified', async () => {
    const res = await api.get(`${baseUrl}/total?result=BARIS`).expect(200);
    expect(res.body.total).toEqual(3);
  });
});

describe('when teacher(s) wanted', () => {
  beforeAll(async () => {
    await helper.createFakeDb();
  });
  afterAll(async () => {
    await Teacher.deleteMany({});
    await Lesson.deleteMany({});
  });

  test('should get one teachers if name presents', async () => {
    const name = 'BARIS';
    const res = await api.get(`${baseUrl}?name=${name}`).expect(200);
    const b = res.body;
    const teacher = await Teacher.findOne({ name: name })
      .populate('lessons')
      .populate('comments');
    const teacherJson = teacher.toJSON();
    expect(b.lessons).toBeDefined();
    expect(b.lessons.length).toEqual(teacherJson.lessons.length);
    expect(b.comments).toBeDefined();
    expect(b.comments.length).toEqual(teacherJson.comments.length);
    expect(b.name).toBeDefined();
    expect(b.name).toEqual(teacherJson.name);
    expect(b.id).toEqual(teacherJson.id);
  });

  test('should get all teachers if name, start & total not presents', async () => {
    const res = await api.get(`${baseUrl}`).expect(200);
    const b = res.body;
    const totalTeachers = await Teacher.find({}).countDocuments();
    expect(b.length).toEqual(totalTeachers);
    expect(b[0].lessons).toBeDefined();
    expect(b[0].comments).toBeDefined();
  });

  test('should get 5 teachers if result does not presents', async () => {
    const res = await api.get(`${baseUrl}?total=5&start=0`).expect(200);
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(5);
    expect(b[0].lessons).toBeDefined();
    expect(b[0].comments).toBeDefined();
  });

  test('should get 5 teachers if result presents', async () => {
    const name = 'TARIH';
    const res = await api.get(`${baseUrl}?total=5&start=0&result=${name}`);
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(5);
    b.map((t) => {
      expect(t.name).toContain(name);
    });
  });

  test('should get 5 to 10 teachers if result does not presents', async () => {
    const res = await api.get(`${baseUrl}?total=5&start=5`).expect(200);
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(5);
    expect(b[0].lessons).toBeDefined();
    expect(b[0].comments).toBeDefined();
  });

  test('should get teachers if result presents and starts from 5', async () => {
    const name = 'TARIH';
    const totalTeachers = await Teacher.find({
      name: { $regex: name, $options: 'i' },
    }).countDocuments();
    const res = await api.get(
      `${baseUrl}?total=${totalTeachers - 5}&start=5&result=${name}`
    );
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(totalTeachers - 5);
    b.map((t) => {
      expect(t.name).toContain(name);
    });
  });

  test('should not get any teachers if start exceeds', async () => {
    const totalTeachers = await Teacher.find({}).countDocuments();
    const res = await api
      .get(`${baseUrl}?total=5&start=${totalTeachers}`)
      .expect(200);
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(0);
  });

  test('should not get any teachers if start exceeds with result', async () => {
    const name = 'TARIH';
    const totalTeachers = await Teacher.find({
      name: { $regex: name, $options: 'i' },
    }).countDocuments();
    console.log('totalTeachers', totalTeachers);
    const res = await api
      .get(`${baseUrl}?total=5&start=${totalTeachers}&result=${name}`)
      .expect(200);
    const b = res.body;
    expect(Array.isArray(b)).toBe(true);
    expect(b.length).toEqual(0);
  });
});
