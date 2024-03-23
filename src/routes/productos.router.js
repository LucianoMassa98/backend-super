const express = require('express');
const router = express.Router();
const ProductoServicio = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getProductosSchema,
  subaPrecioProductoSchema,
} = require('../schemas/producto.schema');

const servicio = new ProductoServicio();

router.get('/findOne',
validatorHandler(getProductoSchema,'query'),
async (req, res, next) => {
  try {
    const productos = await servicio.findOne(req.query);
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/obtenerCodigo',
async (req, res, next) => {
  try {
    const productos = await servicio.obtenerCodigo();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/findAll',
validatorHandler(getProductosSchema,'query'),
async (req, res, next) => {
  try {
    const productos = await servicio.find(req.query);
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/marcas/listado',
async (req, res, next) => {
  try {
    const productos = await servicio.findMarcas();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});
router.get('/rubros/listado',
async (req, res, next) => {
  try {
    const productos = await servicio.findRubros();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});
router.get('/cntTotalCargados',
async (req, res, next) => {
  try {
    const productos = await servicio.cntTotalCargados();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newproduct = await servicio.create(body);
      res.json(newproduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(updateProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const producto = await servicio.update(id, body);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/subaPrecio',
  validatorHandler(subaPrecioProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const producto = await servicio.subaPrecio(req.body);

      res.json(producto);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const band = await servicio.delete(id);
      res.json(band);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
