const express = require('express');
const facturasRouter = require('./facturas.router');
const galponesRouter = require('./galpones.router');
const materialesRouter = require('./materiales.router');
const notasdepedido = require('./notadepedido.router');
const pagosRouter = require('./pagos.router');
const productosRouter = require('./productos.router');
const remitosRouter = require('./remitos.router');
const usuariosRouter = require('./usuarios.router');

//funcion que recibe a la aplicacion por parametro de entrada: MidleWere
function routerApi(app) {
  const router = express.Router();
  //  Para manejar la api por versiones, se crea la ruta maestra de cual todas parten
  app.use('/api/v1', router);
  // defino el endpoint
  router.use('/facturas', facturasRouter);
  router.use('/galpones',galponesRouter);
  router.use('/materiales', materialesRouter);
  router.use('/notasdpds', notasdepedido);
  router.use('/pagos',pagosRouter);
  router.use('/productos',productosRouter);
  router.use('/remitos',remitosRouter);
  router.use('/usuarios',usuariosRouter);

}

module.exports = routerApi;

