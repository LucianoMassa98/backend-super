const express = require('express');
const productosRouter = require('./productos.router');
const notaspedidosRouter = require('./notadepedido.router');
const usuariosRouter = require('./usuarios.router');
const enviomercaderiaRouter = require('./enviomercaderia.router');
const procesodeproduccionRouter = require('./procesoproduccion.router');
const productosterminadosRouter = require('./productosterminados.router');

function routerApi(app){
const router = express.Router();
app.use('/api/v1',rter);
router.use('/enviodemercaderia',enviomercaderiaRouter);router.use('/notadepedido',notaspedidosRouter);router.use('/procesodeproduccion',procesodeproduccionRouter);router.use('/productos',productosRouter);
  router.use('/productosterminados',productosterminadosRouter);
  router.use('/usuarios',usuariosRouter);
}

module.exports = routerApi;
