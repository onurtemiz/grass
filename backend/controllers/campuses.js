const campusesRouter = require('express').Router();
const Campus = require('../models/campus');

campusesRouter.get('/:name', async (req, res) => {
  const campus = await Campus.findOne({ name: req.params.name });
  return res.json(campus.toJSON());
});

campusesRouter.get('/', async (req, res) => {
  const campuses = await Campus.find();
  return res.json(campuses.map((c) => c.toJSON()));
});

module.exports = campusesRouter;
