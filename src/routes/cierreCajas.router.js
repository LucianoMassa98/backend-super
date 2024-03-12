const express = require('express');

const cierreCajasService = require('../services/cierreCajas.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  getCierreCajaSchema, createCierreCajaSchema,queryCierreCajaSchema } = require('../schemas/aperturaCaja.schema');

const router = express.Router();
const service = new cierreCajasService();

router.get('/',
validationHandler(queryCierreCajaSchema,'query'),
  async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/ultima/:id',
validationHandler(getCierreCajaSchema, 'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await service.findLast(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCierreCajaSchema, 'body'),
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
  validationHandler(getCierreCajaSchema, 'params'),
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
