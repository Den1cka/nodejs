const express = require('express');

const passport = require('../passport');
const service = require('../services/news');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const obj = await service.getAllAsync();
    return res.json(obj);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const obj = await service.getAsync(id);
    return res.json(obj);
  } catch (err) {
    return next(err);
  }
});

router.post('/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  const obj = req.body;
  try {
    const id = await service.createAsync(obj);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  let { params: { id } } = req;
  const obj = req.body;
  try {
    id = await service.updateAsync(id, obj);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  let { params: { id } } = req;
  try {
    id = await service.removeAsync(id);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
