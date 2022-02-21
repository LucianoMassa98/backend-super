const express = require('express');
const remitosCompras = require('./remitosCompras.router');
const remitosEnvios = require('./remitosEnvios.router');
const materialesRouter = require('./materiales.router');
const notasdepedido = require('./notadepedido.router');
const productosRouter = require('./productos.router');
const remitosProduccion = require('./remitosProduccion.router');
const remitosProducido = require('./remitosProducido.router');
const usuariosRouter = require('./users.router');
const customerRouter = require('./customer.router');

//funcion que recibe a la aplicacion por parametro de entrada: MidleWere
function routerApi(app) {
  const router = express.Router();
  //  Para manejar la api por versiones, se crea la ruta maestra de cual todas parten
  app.use('/api/v1', router);
  // defino el endpoint
  router.use('/remitosCompras', remitosCompras);
  router.use('/remitosEnvios',remitosEnvios);
  router.use('/materiales', materialesRouter);
  router.use('/notasdpds', notasdepedido);
  router.use('/remitosProduccion',remitosProduccion);
  router.use('/productos',productosRouter);
  router.use('/remitosProducido',remitosProducido);
  router.use('/usuarios',usuariosRouter);
  router.use('/customers',customerRouter);
}

module.exports = routerApi;

