const express = require('express');

const CuentaService = require('../services/cuentas.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCuentaSchema,
  getCuentaSchema,
  updateCuentaSchema,
} = require('../schemas/cuenta.schema');

const router = express.Router();
const service = new CuentaService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCuentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  validationHandler(getCuentaSchema, 'params'),
  validationHandler(updateCuentaSchema, 'body'),
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
  validationHandler(getCuentaSchema, 'params'),
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
