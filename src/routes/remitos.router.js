const express = require('express');
const router = express.Router();

// filtrar remitos de envio por fecha
router.get('/FiltrarPorFecha',(req,res)=>{
  const {fecha} = req.params;

  //devolver lista de notas de pedidos filtradas por fecha
});

//crear remito por llegada de mercaderia
router.post('/',(req,res)=>{
const body = req.body;

});
//crear remito por salida de productos terrminados
router.post('/',(req,res)=>{
  const body = req.body;

  });

module.exports = router;
