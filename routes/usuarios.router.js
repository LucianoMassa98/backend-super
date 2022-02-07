
const express = require('express');
const router = express.Router();
// los query se utilizan para hacer filtros
// http://localhost:3000/user?limit=10&&offset=150
router.get('/',(req,res)=>{
  const {limit,offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('no hay parametros');
  }
});
module.exports = router;
