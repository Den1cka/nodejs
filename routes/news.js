const express = require('express');

const service = require('../services/news');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    const obj = service.getAll();
    return res.json(obj);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', (req, res, next) => {
  const { params: { id } } = req;
  try {
    const obj = service.get(id);
    return res.json(obj);
  } catch (err) {
    return next(err);
  }
});

router.post('/', (req, res, next) => {
  const obj = req.body;
  try {
    const id = service.create(obj);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', (req, res, next) => {
  let { params: { id } } = req;
  const obj = req.body;
  try {
    id = service.update(id, obj);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  let { params: { id } } = req;
  try {
    id = service.remove(id);
    return res.json(id);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
