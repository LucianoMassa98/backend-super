const express = require('express');

const AperturaCajasService = require('../services/aperturaCajas.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  getAperturaCajaSchema, createAperturaCajaSchema,queryAperturaCajaSchema
} = require('../schemas/aperturaCaja.schema');

const router = express.Router();
const service = new AperturaCajasService();

router.get('/',
validationHandler(queryAperturaCajaSchema,'query'),
  async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/ultima/:id',
validationHandler(getAperturaCajaSchema, 'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await service.findLast(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createAperturaCajaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);



router.delete('/:id',
  validationHandler(getAperturaCajaSchema, 'params'),
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
