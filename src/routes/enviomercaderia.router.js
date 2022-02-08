const express = require('express');
const router = express.Router();


//cliente envia mercaderia
router.post('/enviarmacedria',(req,res)=>{
  const body = req.body;
  //el cliente solicita enviar un json de envio
  // si se aprueba se modifican valores y otros son agregados
  //se resta productos terminados
  //se mofifica estado de operacion
  // se crea remito

});

// se modifica valores
router.patch();

//mostrar envios de mercaderia pendiete
router.get('/',(req,res)=>{
  const envios = [];
  res.json(envios);
});
