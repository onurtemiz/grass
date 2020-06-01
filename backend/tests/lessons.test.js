const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');

afterAll(async () => {
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
  mongoose.connection.close();
});

const baseUrl = '/api/lessons';

describe('when get lesson(s)', () => {
  beforeAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
    await helper.createFakeDb();
  });
  afterAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
  });

  test('should get first 3 fled lessons if search presents', async () => {
    const res = await api
      .get(`${baseUrl}?total=3&start=0&search=FLED`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(3);
    res.body.map((l) => {
      expect(l.fullName).toContain('FLED');
      expect(l.comments).toBeDefined();
      expect(l.teacher).toBeDefined();
    });
  });

  test('should get lessons containing S if search presents and starts at 5', async () => {
    const res = await api
      .get(`${baseUrl}?total=40&start=5&search=S`)
      .expect(200);
    const lessonsTotal = await api.get(`${baseUrl}/total?search=S`).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(lessonsTotal.body.total - 5);
    res.body.map((l) => {
      expect(l.fullName).toContain('S');
      expect(l.comments).toBeDefined();
      expect(l.teacher).toBeDefined();
    });
  });

  test('should get 20 lessons if search not presents', async () => {
    const res = await api.get(`${baseUrl}?total=20&start=0`).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(20);
  });

  test('should get 30 to 40 lessons if search not presents', async () => {
    const res = await api.get(`${baseUrl}?total=20&start=30`);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(10);
  });

  test('should get all lessons if nothing is specified', async () => {
    const lessonsTotal = await Lesson.find({}).countDocuments();
    const res = await api.get(`${baseUrl}`).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(lessonsTotal);
  });

  test('should get one lesson if areaCode & digitCode & teacherName presents', async () => {
    const lesson = await Lesson.findOne({}).populate('teacher');
    const lessonJson = lesson.toJSON();
    const res = await api
      .get(
        `${baseUrl}?areaCode=${lessonJson.areaCode}&digitCode=${lessonJson.digitCode}&teacherName=${lessonJson.teacher.name}`
      )
      .expect(200);
    const b = res.body;
    expect(b.fullName).toEqual(lessonJson.fullName);
    expect(b.id).toEqual(lessonJson.id);
    expect(b.sectionCode.length).toEqual(lessonJson.sectionCode.length);
    expect(b.areaCode).toEqual(lessonJson.areaCode);
    expect(b.digitCode).toEqual(lessonJson.digitCode);
    expect(b.comments.length).toEqual(lessonJson.comments.length);
  });

  test('should get one lesson if id presents', async () => {
    const lesson = await Lesson.findOne({});
    const lessonJson = lesson.toJSON();
    const res = await api.get(`${baseUrl}/${lessonJson.id}`).expect(200);
    const b = res.body;
    expect(b.fullName).toEqual(lessonJson.fullName);
    expect(b.id).toEqual(lessonJson.id);
    expect(b.sectionCode.length).toEqual(lessonJson.sectionCode.length);
    expect(b.areaCode).toEqual(lessonJson.areaCode);
    expect(b.digitCode).toEqual(lessonJson.digitCode);
    expect(b.comments.length).toEqual(lessonJson.comments.length);
    expect(b.teacher).toEqual(lessonJson.teacher.toString());
  });
});

describe('when total lessons wanted', () => {
  beforeAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
    await helper.createFakeDb();
  });
  afterAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
  });
  test('should get all total if no search presents', async () => {
    const total = await api.get(`${baseUrl}/total`);
    expect(total.body.total).toBeDefined();
    expect(total.body.total).toEqual(40);
  });

  test('should get fled total if search presents', async () => {
    const total = await api.get(`${baseUrl}/total?search=FLED`).expect(200);
    expect(total.body.total).toBeDefined();
    expect(total.body.total).toEqual(5);
  });

  test('should get hist & psy if search presents', async () => {
    const total = await api.get(`${baseUrl}/total?search=S`).expect(200);
    expect(total.body.total).toBeDefined();
    expect(total.body.total).toEqual(35);
  });
});

describe('when want to add a new lesson', () => {
  beforeEach(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
  });
  test('should not add lesson if areaCode is missing', async () => {
    let lesson = {
      digitCode: '101',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    const res = await api.post('/api/lessons').send(lesson).expect(400);
    expect(res.body.error).toBeDefined();
  });
  test('should not add lesson if teacher is missing', async () => {
    let lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      sectionCode: '01',
    };
    const res = await api.post('/api/lessons').send(lesson).expect(400);
    expect(res.body.error).toBeDefined();
  });
  test('should not add lesson if digitCode is missing', async () => {
    let lesson = {
      areaCode: 'PSY',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    const res = await api.post('/api/lessons').send(lesson).expect(400);
    expect(res.body.error).toBeDefined();
  });
  test('should not add lesson if sectionCode is missing', async () => {
    let lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      teacher: 'Ahmet Mehmet',
    };
    const res = await api.post('/api/lessons').send(lesson).expect(400);
    expect(res.body.error).toBeDefined();
  });

  test("should add lesson if lesson's teacher is different", async () => {
    let lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    await api.post('/api/lessons').send(lesson).expect(201);
    lesson.teacher = 'Mehmet Ahmet';
    lesson.sectionCode = '02';
    await api.post('/api/lessons').send(lesson).expect(201);
    const teacher = await Teacher.find({});
    expect(teacher).toHaveLength(2);
    const dbLessons = await Lesson.find({}).populate('teacher');
    expect(dbLessons).toHaveLength(2);
  });

  test("should add lesson's section code if lesson already exists", async () => {
    let lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    await api.post('/api/lessons').send(lesson).expect(201);
    lesson.sectionCode = '02';
    await api.post('/api/lessons').send(lesson).expect(201);
    const teacher = await Teacher.findOne({ name: lesson.teacher });
    const teacherJSON = teacher.toJSON();
    expect(teacherJSON.name).toBe(lesson.teacher);
    expect(teacher.lessons).toHaveLength(1);
    const dbLesson = await Lesson.findById(teacherJSON.lessons[0]).populate(
      'teacher'
    );
    const dbLessonJSON = dbLesson.toJSON();
    expect(dbLessonJSON.teacher.name).toBe(lesson.teacher);
    expect(dbLessonJSON.sectionCode).toHaveLength(2);
  });

  test('should add lesson if teacher does not exists', async () => {
    const lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    const res = await api.post('/api/lessons').send(lesson);
    const teacher = await Teacher.findOne({ name: lesson.teacher });
    const teacherJSON = teacher.toJSON();
    expect(teacherJSON.name).toBe(lesson.teacher);
    expect(teacher.lessons).toHaveLength(1);
    const dbLesson = await Lesson.findById(teacherJSON.lessons[0]).populate(
      'teacher'
    );
    const dbLessonJSON = dbLesson.toJSON();
    expect(dbLessonJSON.teacher.name).toBe(lesson.teacher);
  });

  test('should add lesson if teacher exists', async () => {
    const lesson = {
      areaCode: 'PSY',
      digitCode: '101',
      sectionCode: '01',
      teacher: 'Ahmet Mehmet',
    };
    await api.post('/api/teachers').send({ name: 'Ahmet Mehmet' }).expect(201);
    await api.post('/api/lessons').send(lesson);
    const teacher = await Teacher.findOne({ name: lesson.teacher });
    const teacherJSON = teacher.toJSON();
    expect(teacherJSON.name).toBe(lesson.teacher);
    expect(teacher.lessons).toHaveLength(1);
    const dbLesson = await Lesson.findById(teacherJSON.lessons[0]).populate(
      'teacher'
    );
    const dbLessonJSON = dbLesson.toJSON();
    expect(dbLessonJSON.teacher.name).toBe(lesson.teacher);
    const total = await Teacher.countDocuments();
    expect(total).toEqual(1);
  });
});
