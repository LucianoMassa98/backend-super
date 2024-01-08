const express = require('express');

const ClienteService = require('../services/clientes.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createClienteSchema,
  getClienteSchema,
  updateClienteSchema,
} = require('../schemas/cliente.schema');

const router = express.Router();
const service = new ClienteService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createClienteSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const cliente = await service.create(body)
      res.json(cliente);
    } catch (error) {
      next(error);
    }
  }
);


router.delete('/:id',
  validationHandler(getClienteSchema, 'params'),
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
