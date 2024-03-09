const express = require('express');
const notasdepedido = require('./notadepedido.router');
const productosRouter = require('./productos.router');
const clientesRouter = require('./clientes.router');

const cajasRouter = require('./cajas.router');
const cobrosRouter = require('./cobros.router');
const cuentasRouter = require('./cuentas.router');

const usuariosRouter = require('./users.router');
const customerRouter = require('./customer.router');
const informesRouter = require('./informes.router');
const movimientoRouter = require('./movimientos.router');
const descargaRouter = require('./descargas.router');
const generadorRouter = require('./generador.router');


function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/notaPedidos', notasdepedido);
  router.use('/productos',productosRouter);
  router.use('/cobros',cobrosRouter);
  router.use('/cuentas',cuentasRouter);
  router.use('/movimientos',movimientoRouter);
  router.use('/cajas',cajasRouter);
  router.use('/usuarios',usuariosRouter);
  router.use('/customers',customerRouter);
  router.use('/informes',informesRouter);
  router.use('/clientes',clientesRouter);
  router.use('/descargas',descargaRouter);
  router.use('/generador',generadorRouter);

}

module.exports = routerApi;

