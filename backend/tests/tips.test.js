const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const Tip = require('../models/tip');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await User.deleteMany({});
  await Tip.deleteMany({});
  let user = {
    email: 'onurtemiz@boun.edu.tr',
    password: '123456789',
    username: 'temizonur',
  };

  await helper.signupUser(user);
});

afterAll(async () => {
  await User.deleteMany({});
  await Tip.deleteMany({});
  mongoose.connection.close();
});

const baseUrl = '/api/tips';
const email = 'onurtemiz@boun.edu.tr';
const password = '123456789';

describe('when user post a tip', () => {
  afterAll(async () => {
    await Tip.deleteMany({});
  });
  test('should give error if tip not defined', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      user: dbUser._id,
      isAnonim: true,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  test('should give error if isAnonim not defined', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  test('should give error if tip length more than 150', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'a'.repeat(151),
      user: dbUser._id,
      isAnonim: true,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  test('should give error if body not defined', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});

    const res = await api
      .post(`${baseUrl}`)
      .set('Authorization', `bearer ${user.token}`)
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  test('should give error if user token is invalid', async () => {
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
      isAnonim: true,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ggakwgadasodaj`)
      .expect(401);
    expect(res.body.error).toBeDefined();
  });

  test('should give error if user token is missing', async () => {
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
      isAnonim: true,
    };
    const res = await api.post(`${baseUrl}`).send(tipObj).expect(401);
    expect(res.body.error).toBeDefined();
  });

  test('should post anonim tip if everything is right', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
      isAnonim: true,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`)
      .expect(201);
    const b = res.body;
    expect(b.tip).toBeDefined();
    expect(b.tip).toEqual(tipObj.tip);
    expect(b.user).toBeDefined();
    expect(b.user.toString()).toEqual(tipObj.user.toString());
    expect(b.isAnonim).toBeDefined();
    expect(b.isAnonim).toEqual(tipObj.isAnonim);
    let dbTip = await Tip.findOne({ tip: tipObj.tip });
    dbTip = dbTip.toJSON();
    expect(dbTip.tip).toBeDefined();
    expect(dbTip.tip).toEqual(tipObj.tip);
    expect(dbTip.user).toBeDefined();
    expect(dbTip.user.toString()).toEqual(tipObj.user.toString());
    expect(dbTip.isAnonim).toBeDefined();
    expect(dbTip.isAnonim).toEqual(tipObj.isAnonim);
  });

  test('should post anonim tip if everything is right', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir tm kardes',
      user: dbUser._id,
      isAnonim: false,
    };
    const res = await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`)
      .expect(201);
    const b = res.body;
    expect(b.tip).toBeDefined();
    expect(b.tip).toEqual(tipObj.tip);
    expect(b.user).toBeDefined();
    expect(b.user.toString()).toEqual(tipObj.user.toString());
    expect(b.isAnonim).toBeDefined();
    expect(b.isAnonim).toEqual(tipObj.isAnonim);
    let dbTip = await Tip.findOne({ tip: tipObj.tip });
    dbTip = dbTip.toJSON();
    expect(dbTip.tip).toBeDefined();
    expect(dbTip.tip).toEqual(tipObj.tip);
    expect(dbTip.user).toBeDefined();
    expect(dbTip.user.toString()).toEqual(tipObj.user.toString());
    expect(dbTip.isAnonim).toBeDefined();
    expect(dbTip.isAnonim).toEqual(tipObj.isAnonim);
  });
});

describe.only('when getting tips', () => {
  beforeEach(async () => {
    await Tip.deleteMany({});
  });

  test('should get anonim tip', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
      isAnonim: true,
    };
    await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`);

    const res = await api
      .get(`${baseUrl}`)
      .set('Authorization', `bearer ${user.token}`);
    const b = res.body;
    expect(b.tip).toBeDefined();
    expect(b.tip).toEqual(tipObj.tip);
    expect(b.user).not.toBeDefined();
    expect(b.isAnonim).toBeDefined();
    expect(b.isAnonim).toEqual(tipObj.isAnonim);
  });

  test('should get not anonim tip', async () => {
    const user = await helper.loginUser({ email, password });
    const dbUser = await User.findOne({});
    const tipObj = {
      tip: 'Bu onemli bir tiptir kardes',
      user: dbUser._id,
      isAnonim: false,
    };
    await api
      .post(`${baseUrl}`)
      .send(tipObj)
      .set('Authorization', `bearer ${user.token}`);

    const res = await api
      .get(`${baseUrl}`)
      .set('Authorization', `bearer ${user.token}`);
    const b = res.body;
    expect(b.tip).toBeDefined();
    expect(b.tip).toEqual(tipObj.tip);
    expect(b.user).toBeDefined();
    expect(b.user).toEqual(user.username);
    expect(b.isAnonim).toBeDefined();
    expect(b.isAnonim).toEqual(tipObj.isAnonim);
  });
});
