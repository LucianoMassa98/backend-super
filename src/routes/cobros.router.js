const express = require('express');

const CobroService = require('../services/cobros.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCobroSchema,
  getCobroSchema,
  updateCobroSchema,
} = require('../schemas/cobro.schema');

const router = express.Router();
const service = new CobroService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCobroSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validationHandler(getCobroSchema, 'params'),
  validationHandler(updateCobroSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getCobroSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
