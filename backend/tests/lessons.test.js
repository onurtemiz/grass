const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

describe('when want to add a new lesson', () => {
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
