const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.json([
    {
      npt: 'ntp1',
      total: 2000
    },
    {
      npt: 'ntp2',
      total: 500

    }
  ]);
});
router.get('/:id',(req,res)=>{
  const {id} = req.params;
  res.json({
    id
  });
});



module.exports = router;
