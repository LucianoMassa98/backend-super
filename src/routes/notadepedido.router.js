
const express = require('express');
const router = express.Router();

//cliente pide clase de nota de pedido

//produccion solicita notas de pedidos vigentes
router.get('/',(req,res)=>{
  notasdepedidosx = [];
  res.json(notasdepedidosx);

});
// filtrar operaciones por nota de pedidos y fecha
router.get('/FiltrarPorFecha',(req,res)=>{
  const {fecha} = req.params;

  //devolver lista de notas de pedidos filtradas por fecha
});
//cliente solicita nota de pedido por id
router.get('/:id',(req,res)=>{
  const { id } = req.params;
  // obtiene el id y la busca en tabla de nota de pedidos y la retorna

});
//el cliente agrega una nota de pedido a la base de datos con antes su verificacion
router.post('/agregar',(req,res)=>{

  const body = req.body;
  // agregar nota de pedido a base de datos
  // si cumple con requisitos sino devolver error 404 deria ser funcion asincrona

});




module.exports = router;
