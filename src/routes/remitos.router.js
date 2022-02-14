const express = require('express');
const router = express.Router();

const formularioService = require('../services/formulario.service');
const servicio = new formularioService('RMT');
//cliente pide clase de nota de pedido

//produccion solicita notas de pedidos vigentes
router.get('/listaRMT',async(req,res)=>{
 const remitos = await servicio.Buscar();
  res.json(remitos);

});
// filtrar operaciones por nota de pedidos y fecha
router.get('/FiltrarPorFecha',async (req,res)=>{
  const {fecha} = req.params;
  const remitos = await servicio.BuscarporFecha(fecha);
  res.json(remitos);
  //devolver lista de notas de pedidos filtradas por fecha
});
//cliente solicita nota de pedido por id
router.get('/:id', async(req,res)=>{
  const { id } = req.params;

  const RMT = await servicio.BuscarporID(id);
  res.json(RMT);
  // obtiene el id y la busca en tabla de nota de pedidos y la retorna

});
//el cliente agrega una nota de pedido a la base de datos con antes su verificacion
router.post('/agregar',async (req,res)=>{
  const body = req.body;
  const RMT = await servicio.Crear(body);

  res.json(RMT);

  // agregar nota de pedido a base de datos
  // si cumple con requisitos sino devolver error 404 deria ser funcion asincrona

});

module.exports = router;
