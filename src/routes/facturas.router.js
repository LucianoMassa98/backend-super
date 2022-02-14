const express = require('express');
const router = express.Router();
const formularioService = require('../services/formulario.service');
const servicio = new formularioService('FTA');
//cliente pide clase de nota de pedido

//produccion solicita notas de pedidos vigentes
router.get('/listaFTA',async(req,res)=>{
 const facturas = await servicio.Buscar();
  res.json(facturas);

});
// filtrar operaciones por nota de pedidos y fecha
router.get('/FiltrarPorFecha',async (req,res)=>{
  const {fecha} = req.params;
  const facturas = await servicio.BuscarporFecha(fecha);
  res.json(facturas);
  //devolver lista de notas de pedidos filtradas por fecha
});
//cliente solicita nota de pedido por id
router.get('/:id', async(req,res)=>{
  const { id } = req.params;

  const FTA = await servicio.BuscarporID(id);
  res.json(FTA);
  // obtiene el id y la busca en tabla de nota de pedidos y la retorna

});
//el cliente agrega una nota de pedido a la base de datos con antes su verificacion
router.post('/agregar',async (req,res)=>{
  const body = req.body;
  const FTA = await servicio.Crear(body);

  res.json(FTA);

  // agregar nota de pedido a base de datos
  // si cumple con requisitos sino devolver error 404 deria ser funcion asincrona

});



module.exports = router;
