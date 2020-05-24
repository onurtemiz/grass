const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');

beforeAll(async () => {
  await User.deleteMany({});

  let newUser = {
    email: 'onur@boun.edu.tr',
    password: '123456789',
    username: 'temizonur',
  };
  await api.post('/api/users/signup').send(newUser).expect(201);
});

afterAll(() => {
  mongoose.connection.close();
});

describe('when there is already a user', () => {
  test('should prevent signup when email matches', async () => {
    let user = {
      email: 'onur@boun.edu.tr',
      password: '1234567899',
      username: 'temizimben',
    };
    const newUser = await api.post('/api/users/signup').send(user).expect(400);
    console.log('newUser.body', newUser.body);

    expect(newUser.body).toHaveProperty('error');
  });

  test('should prevent signup when username matches', async () => {
    let user = {
      email: 'onuasdr@boun.edu.tr',
      password: '1234567899',
      username: 'temizonur',
    };
    const newUser = await api.post('/api/users/signup').send(user).expect(400);

    expect(newUser.body).toHaveProperty('error');
  });
});

describe('when user tries to signup with unacceptable information ', () => {
  test('should not signup if email is not boun', async () => {
    let gmailUser = {
      email: 'onurtemiz@gmail.com',
      password: 'temizonur12',
      username: '123456789',
    };
    let hotmailUser = {
      email: 'onurtemiz@hotmail.com',
      password: 'temizonur12',
      username: '123456789',
    };
    let domainUser = {
      email: 'onurtemiz@onurtemiz.com',
      password: 'temizonur12',
      username: '123456789',
    };
    let closeUser = {
      email: 'onurtemiz@buon.com',
      password: 'temizonur12',
      username: '123456789',
    };
    let createdUser = await api
      .post('/api/users/signup')
      .send(gmailUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
    createdUser = await api
      .post('/api/users/signup')
      .send(hotmailUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
    createdUser = await api
      .post('/api/users/signup')
      .send(domainUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
    createdUser = await api
      .post('/api/users/signup')
      .send(closeUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });

  test('should not signup if username is less than 1 character', async () => {
    let closeUser = {
      email: 'onurtemiz@boun.com',
      password: 'temizonur12',
      username: '',
    };
    createdUser = await api
      .post('/api/users/signup')
      .send(closeUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });

  test('should not signup if username is more than 15 character', async () => {
    let closeUser = {
      email: 'onurtemiz@boun.com',
      password: 'temizonur12',
      username: '1234567890123456',
    };
    createdUser = await api
      .post('/api/users/signup')
      .send(closeUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });

  test('should not signup if password is 0 character', async () => {
    let closeUser = {
      email: 'onurtemiz@boun.com',
      password: '',
      username: '1234567890123456',
    };
    createdUser = await api
      .post('/api/users/signup')
      .send(closeUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });

  test('should not signup if password is less than 8 character', async () => {
    let closeUser = {
      email: 'onurtemiz@boun.com',
      password: '1234567',
      username: '1234567890123456',
    };
    createdUser = await api
      .post('/api/users/signup')
      .send(closeUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });
});

describe('when user tries to signup with missing information', () => {
  test('should not signup if email is missing', async () => {
    let newUser = {
      password: '123456789',
      username: 'temizonur',
    };
    const createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });

  test('should not signup if password is missing', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      username: 'temizonur',
    };
    const createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });
  test('should not signup if username is missing', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      password: 'temizonur12',
    };
    const createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(400);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).toHaveProperty('error');
  });
});

describe('when user tries to signup', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test('should signup if everything is right', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      password: '123456789',
      username: 'okokokok',
    };
    const createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).not.toHaveProperty('passwordHash');
    expect(createdUser.body).not.toHaveProperty('_id');
    expect(createdUser.body).toHaveProperty('username');
    expect(createdUser.body).toHaveProperty('email');
    expect(createdUser.body).toHaveProperty('id');
    expect(createdUser.body).toHaveProperty('comments');
    const dbUser = await User.findOne({ email: 'onurtemiz@boun.edu.tr' });
    expect(dbUser).toBeDefined();
    expect(dbUser).toHaveProperty('passwordHash');
    expect(dbUser._id.toString()).toEqual(createdUser.body.id);
  });
  test('should signup with 8 character password', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      password: '12345678',
      username: 'tmmmmmm',
    };
    let createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).not.toHaveProperty('passwordHash');
    expect(createdUser.body).not.toHaveProperty('_id');
    expect(createdUser.body).toHaveProperty('username');
    expect(createdUser.body).toHaveProperty('email');
    expect(createdUser.body).toHaveProperty('id');
    expect(createdUser.body).toHaveProperty('comments');
    const dbUser = await User.findOne({ email: 'onurtemiz@boun.edu.tr' });
    expect(dbUser).toBeDefined();
    expect(dbUser).toHaveProperty('passwordHash');
    expect(dbUser._id.toString()).toEqual(createdUser.body.id);
  });
  test('should signup with 15 character username', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      password: '12345678',
      username: '123456789123456',
    };
    let createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).not.toHaveProperty('passwordHash');
    expect(createdUser.body).not.toHaveProperty('_id');
    expect(createdUser.body).toHaveProperty('username');
    expect(createdUser.body).toHaveProperty('email');
    expect(createdUser.body).toHaveProperty('id');
    expect(createdUser.body).toHaveProperty('comments');
    const dbUser = await User.findOne({ email: 'onurtemiz@boun.edu.tr' });
    expect(dbUser).toBeDefined();
    expect(dbUser).toHaveProperty('passwordHash');
    expect(dbUser._id.toString()).toEqual(createdUser.body.id);
  });

  test('should signup with one character username', async () => {
    let newUser = {
      email: 'onurtemiz@boun.edu.tr',
      password: '12345678',
      username: '1',
    };
    let createdUser = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201);
    expect(createdUser).toHaveProperty('body');
    expect(createdUser.body).not.toHaveProperty('passwordHash');
    expect(createdUser.body).not.toHaveProperty('_id');
    expect(createdUser.body).toHaveProperty('username');
    expect(createdUser.body).toHaveProperty('email');
    expect(createdUser.body).toHaveProperty('id');
    expect(createdUser.body).toHaveProperty('comments');
    const dbUser = await User.findOne({ email: 'onurtemiz@boun.edu.tr' });
    expect(dbUser).toBeDefined();
    expect(dbUser).toHaveProperty('passwordHash');
    expect(dbUser._id.toString()).toEqual(createdUser.body.id);
  });
});
