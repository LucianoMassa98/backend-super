const express = require('express');
const facturasRouter = require('./facturas.router');
const galponesRouter = require('./galpones.router');
const materialesRouter = require('./materiales.router');
const notasdepedido = require('./notadepedido.router');
const pagosRouter = require('./pagos.router');
const productosRouter = require('./productos.router');
const remitosRouter = require('./remitos.router');
const usuariosRouter = require('./usuarios.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
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

//api.example.com/productos
//api.example.com/productos?page=1
//api.example.com/productos?limit=1&offset=2
//api.example.com/productos?region=USA
//api.example.com/productos?region=USA&brand=XY
