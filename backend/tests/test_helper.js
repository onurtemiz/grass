const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

const loginUser = async (u) => {
  const user = await api.post('/api/login').send(u);
  return user.body;
};

const signupUser = async (u) => {
  const user = await api.post('/api/users/signup').send(u);
  return user.body;
};

const signupAndLoginUser = async (u) => {
  const signupUser = await signupUser(u);
  const loggedInUser = await loginUser(u.email, u.password);
  return loggedInUser.body;
};

module.exports = { signupAndLoginUser, signupUser, loginUser };
