const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');

beforeAll(async () => {
  await User.deleteMany({});
  let newUser = {
    email: 'onurtemiz@boun.edu.tr',
    password: '123456789',
    username: 'temizonur',
  };
  await api.post('/api/users/signup').send(newUser).expect(201);
});

afterAll(() => {
  mongoose.connection.close();
});

test('should login', async () => {
  let user = {
    email: 'onurtemiz@boun.edu.tr',
    password: '123456789',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(200);
  expect(loggedUser).toHaveProperty('body');
  expect(loggedUser.body).not.toHaveProperty('passwordHash');
  expect(loggedUser.body).not.toHaveProperty('_id');
  expect(loggedUser.body).toHaveProperty('username');
  expect(loggedUser.body).toHaveProperty('email');
  expect(loggedUser.body).toHaveProperty('id');
  expect(loggedUser.body).toHaveProperty('token');
});

test('should not login if email is missing', async () => {
  let user = {
    password: '123456789',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(400);
  expect(loggedUser.body).toHaveProperty('error');
});

test('should not login if password is missing', async () => {
  let user = {
    email: 'onurtemiz@boun.edu.tr',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(400);
  expect(loggedUser.body).toHaveProperty('error');
});

test('should not login if password is wrong', async () => {
  let user = {
    email: 'onurtemiz@boun.edu.tr',
    password: '123456777',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(401);
  expect(loggedUser.body).toHaveProperty('error');
});

test('should not login if there is no email match in db', async () => {
  let user = {
    email: 'onurteemiz@boun.edu.tr',
    password: '123456789',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(401);
  expect(loggedUser.body).toHaveProperty('error');
});
test('should not login if email is not boun', async () => {
  let user = {
    email: 'onurtemiz@buon.edu.tr',
    password: '123456789',
  };
  const loggedUser = await api.post('/api/login').send(user).expect(400);
  expect(loggedUser.body).toHaveProperty('error');
});
