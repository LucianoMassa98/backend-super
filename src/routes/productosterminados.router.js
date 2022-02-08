const express = require('express');
const router = express.Router();


//cliente solicita productos terminados y servidor los envia sino error 404
router.get('/',(req,res)=>{
  const productos = [];
  res.json(productos);
});
//cliente solicita agregar producto terminado
router.post('/agregar',(req,res)=>{
  const body = req.body;
  //agregar a base de datos de productos terminados
});
//cliente borra terminado por id
router.put('/borrar/:id',(req,res)=>{
  const {id} = req.params;
  // borrar de bsd procesos por id
});
//cliente solicita modificar producto terminado por id con la funcion doble
router.post('/modificar/:id',(req,res)=>{
  const {id} = req.body;
});
