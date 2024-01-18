const express = require('express');

const MovimientoService = require('../services/movimientos.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createMovimientoSchema,
  getMovimientoSchema,
  updateMovimientoSchema,
  queryMovimientoSchema
} = require('../schemas/movimiento.schema');

const router = express.Router();
const service = new MovimientoService();

router.get('/',
validationHandler(queryMovimientoSchema,'query'),
  async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});
router.get('/ultimoClosed/:cajaId',  async (req, res, next) => {
  try {
    const {cajaId} = req.params;
    res.json(await service.findLastClose(cajaId));
  } catch (error) {
    next(error);
  }
});
router.get('/ultimoOpened/:cajaId',  async (req, res, next) => {
  try {
    const {cajaId} = req.params;
    res.json(await service.findLastOpen(cajaId));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createMovimientoSchema, 'body'),
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
  validationHandler(getMovimientoSchema, 'params'),
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
