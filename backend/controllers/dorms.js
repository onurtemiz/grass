const dormsRouter = require('express').Router();
const Dorm = require('../models/dorm');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

dormsRouter.get('/:name', async (req, res) => {
  const dorm = await Dorm.findOne({ name: req.params.name }).populate({
    path: 'comments',
    select: ['user'],
  });
  return res.json(dorm.toJSON());
});

dormsRouter.get('/', async (req, res) => {
  const dorms = await Dorm.find();
  return res.json(dorms.map((d) => d.toJSON()));
});

module.exports = dormsRouter;
