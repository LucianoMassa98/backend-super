const express = require('express');
const productosRouter = require('./productos.router');
const notaspedidosRouter = require('./notaspedidos.router');
const usuariosRouter = require('./usuarios.router');
function routerApi(app){
const router = express.Router();
app.use('/api/v1',router);
  router.use('/productos',productosRouter);
  router.use('/notas-de-pedidos',notaspedidosRouter);
  router.use('/usuarios',usuariosRouter);
}

module.exports = routerApi;
