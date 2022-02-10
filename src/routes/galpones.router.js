const express = require('express');
const router = express.Router();



// lista de galpones
router.get('/',(req,res)=>{

});

// obtener query galpones
router.get('/',(req,res)=>{
  const {limit , offset} = req.query;
  if(limit && offset){
    res.json(
      {
     //envio de json
    }
      );
  }else{
    res.send('no hay parametros');
  }
});
//galpon por id
router.get('/:id',(req,res)=>{
const {id} = req.params;
//enviar galpon

});

//agregar a galponID el materialID
router.post('/',(req,res)=>{
  const body = req.body;
});




module.exports = router;
