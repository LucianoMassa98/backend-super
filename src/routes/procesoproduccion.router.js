const express = require('express');
const router = express.Router();


//cliente solicita procesos de produccion y servidor los envia sino error 404
router.get('/',(req,res)=>{
  const procesos = [];
  //clasifica segun galpon
  res.json(procesos);
});
//cliente solicita agregar proceso de produccion
router.post('/agregar',(req,res)=>{
  const body = req.body;
  //agregar a base de datos de procesos
});

//cliente borra proceso de produccion por id
router.put('/borrar/:id',(req,res)=>{
  const {id} = req.params;
  // borrar de bsd procesos por id
});

