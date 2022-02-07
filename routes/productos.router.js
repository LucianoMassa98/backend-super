const express = require('express');
const router = express.Router();
const port = 3000;

//endpoints productos
router.get('/',(req,res)=>{
  res.json([{
    name: 'huevo chico',
    price: 3000
  },
  {
    name: 'huebo grande',
    price: 2000
  }
]);
  });
router.get('/:id',(req, res)=>{
  const { id } = req.params;
  res.json({
    id
  });
});

router.post('/',(req,res)=>{
const body = req.body;
res.json({
  message: 'created',
  data: body
});
});
module.exports = router;
