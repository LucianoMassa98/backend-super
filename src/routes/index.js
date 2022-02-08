const express = require('express');
const productosRouter = require('./productos.router');
const notaspedidosRouter = require('./notaspedidos.router');
const usuariosRouter = require('./usuarios.router');
const enviomercaderiaRouter = require('./enviomercaderia.router');
const procesodeproduccionRouter = require('./procesoproduccion.router');
const productosterminadosRouter = require('./productosterminados.router');
function routerApi(app){
const router = express.Router();

app.use('/api/v1',router);

  router.use('/envio-de-mercaderia',enviomercaderiaRouter);
  router.use('/nota-de-pedido',notaspedidosRouter);
  router.use('/proceso-de-produccion',procesodeproduccionRouter);
  router.use('/productos',productosRouter);
  router.use('/productos-terminados',productosterminadosRouter);
  router.use('/usuarios',usuariosRouter);
}

module.exports = routerApi;
