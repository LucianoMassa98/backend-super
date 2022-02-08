
const express = require('express');
const router = express.Router();

const notasdepedidosx = [{},{},{}];

//cliente pide clase de nota de pedido

//cliente solicita notas de pedidos vigentes
router.get('/',(req,res)=>{
  res.json(notasdepedidosx);

});
//cliente solicita nota de pedido por id
router.get('/:id',(req,res)=>{
  const { id } = req.params;
  // obtiene el id y la busca en tabla de nota de pedidos y la retorna
  res.json({
    id
  });
});
//cliente modifica en nota de pedido {x} el producto {y}
router.get('/',(req,res)=>{

});
//el cliente agrega una nota de pedido a la base de datos con antes su verificacion
router.post('/agregar',(req,res)=>{

  const body = req.body;
  // agregar nota de pedido a base de datos si cumple con requisitos sino devolver error 404 deria ser funcion asincrona
  (body)
  ?  listaproductos.push(body)
  : console.error('error')

});

// filtrar operaciones por nota de pedidos y fecha
router.get('/:fecha',(req,res)=>{
  const {fecha} = req.params;

  //devolver lista de notas de pedidos filtradas por fecha
});



