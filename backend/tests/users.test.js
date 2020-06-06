const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');

beforeEach(async () => {
  await User.deleteMany({});
  let user = {
    email: 'onurtemiz@boun.edu.tr',
    password: '123456789',
    username: 'temizonur',
  };
  let userTwo = {
    email: 'onur@boun.edu.tr',
    password: '123456789',
    username: 'onur',
  };
  await helper.createFakeDb();
  await helper.signupUser(user);
  await helper.signupUser(userTwo);
});
afterAll(() => {
  mongoose.connection.close();
});

describe('when tries to follow', () => {
  const password = '123456789';
  const email = 'onurtemiz@boun.edu.tr';

  test('should unfollow', async () => {
    const lesson = await Lesson.findOne({});
    const user = await helper.loginUser({
      email,
      password,
    });
    let dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
    await api
      .put('/api/users/follow')
      .send({ id: lesson._id })
      .set('Authorization', `bearer ${user.token}`)
      .expect(200);
    dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(1);
    expect(dbUser.following[0].toString()).toEqual(lesson._id.toString());
    const res = await api
      .put('/api/users/follow')
      .send({ id: lesson._id })
      .set('Authorization', `bearer ${user.token}`)
      .expect(200);

    dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
  });

  test('should give error when token is misshape', async () => {
    const lesson = await Lesson.findOne({});
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users/follow')
      .send({ id: lesson._id })
      .set('Authorization', `bearer testhaheheoheokXDXDsdsaad!3rd`);
    expect(res).toHaveProperty('error');
  });

  test('should give error when token is missing', async () => {
    const lesson = await Lesson.findOne({});

    const res = await api.put('/api/users/follow').send({ id: lesson._id });
    expect(res).toHaveProperty('error');
  });

  test('should give error if id is not lessonId', async () => {
    const teacher = await Teacher.findOne({});
    const user = await helper.loginUser({
      email,
      password,
    });
    let dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
    const res = await api
      .put('/api/users/follow')
      .send({ id: teacher._id })
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
    dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
  });

  test('should give error if id is missing', async () => {
    const user = await helper.loginUser({
      email,
      password,
    });
    let dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
    const res = await api
      .put('/api/users/follow')
      .send({})
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
    dbUser = await User.findOne({ email });

    expect(dbUser.following.length).toEqual(0);
  });

  test('should give error if id is misformat', async () => {
    const user = await helper.loginUser({
      email,
      password,
    });
    let dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
    const res = await api
      .put('/api/users/follow')
      .send({ id: 'asfgaogekgo' })
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
    dbUser = await User.findOne({ email });

    expect(dbUser.following.length).toEqual(0);
  });
  test('should follow', async () => {
    const lesson = await Lesson.findOne({});
    const user = await helper.loginUser({
      email,
      password,
    });
    let dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(0);
    await api
      .put('/api/users/follow')
      .send({ id: lesson._id })
      .set('Authorization', `bearer ${user.token}`)
      .expect(200);
    dbUser = await User.findOne({ email });
    expect(dbUser.following.length).toEqual(1);
  });
});

describe('when user gives wrong infirmation', () => {
  test('should give error when currentPassword is wrong', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .set('Authorization', `bearer ${user.token}`)
      .send({ username: 'temizler', currentPassword: '12345678910' });
    expect(res).toHaveProperty('error');
  });

  test('should give error when username is more than 15 characters', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .set('Authorization', `bearer ${user.token}`)
      .send({ username: '1234567891234567', currentPassword: '123456789' });
    expect(res).toHaveProperty('error');
  });

  test('should give error when username is already taken', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .set('Authorization', `bearer ${user.token}`)
      .send({ username: 'onur', currentPassword: '123456789' });
    expect(res).toHaveProperty('error');
  });

  test('should give error when password is less than 8 characters', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .set('Authorization', `bearer ${user.token}`)
      .send({ password: 'onur', currentPassword: '123456789' });
    expect(res).toHaveProperty('error');
  });
});

describe('when user misses information', () => {
  test('should give error when missing token', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .send({ username: 'temizler', currentPassword: password });
    expect(res).toHaveProperty('error');
  });

  test('should give error when missing currentPassword', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .send({ username: 'temizler' })
      .set('Authorization', `bearer ${user.token}`);
    expect(res).toHaveProperty('error');
  });
  test('should give error when token is misshape', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .send({ username: 'temizler' })
      .set('Authorization', `bearer testhaheheoheokXDXDsdsaad!3rd`);
    expect(res).toHaveProperty('error');
  });
  test('should give error when no new password or username given', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    const res = await api
      .put('/api/users')
      .send({})
      .set('Authorization', `bearer ${user.token}`);
    expect(res).toHaveProperty('error');
  });
});

describe('when user does everything right', () => {
  test('should change his username', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    await api
      .put('/api/users')
      .send({ username: 'temizler', currentPassword: password })
      .set('Authorization', `bearer ${user.token}`);
    const sucUser = await helper.loginUser({ email, password });
    expect(sucUser.username).toBe('temizler');
    const dbUser = await User.findOne({ email });
    expect(dbUser.toJSON().username).toBe('temizler');
  });

  test('should change his password', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    await api
      .put('/api/users')
      .send({ password: 'onur12345', currentPassword: password })
      .set('Authorization', `bearer ${user.token}`);
    const failedLogin = await helper.loginUser({ email, password });
    expect(failedLogin).toHaveProperty('error');
    const sucLogin = await helper.loginUser({ email, password: 'onur12345' });
    expect(sucLogin).toHaveProperty('email');
    expect(sucLogin).toHaveProperty('username');
    expect(sucLogin).toHaveProperty('id');
  });

  test('should change both his password and username', async () => {
    const password = '123456789';
    const email = 'onurtemiz@boun.edu.tr';
    const user = await helper.loginUser({
      email,
      password,
    });
    await api
      .put('/api/users')
      .send({
        password: 'onur12345',
        currentPassword: password,
        username: 'temizler',
      })
      .set('Authorization', `bearer ${user.token}`);
    const failedLogin = await helper.loginUser({ email, password });
    expect(failedLogin).toHaveProperty('error');
    const sucLogin = await helper.loginUser({ email, password: 'onur12345' });
    expect(sucLogin).toHaveProperty('email');
    expect(sucLogin).toHaveProperty('username');
    expect(sucLogin.username).toBe('temizler');
    expect(sucLogin).toHaveProperty('id');
  });
});
