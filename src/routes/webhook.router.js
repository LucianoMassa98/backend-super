const express = require('express');
const router = express.Router();

router.get('/payment',
async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);
    res.json('webhook');
  } catch (error) {
    next(error);
  }
});




module.exports = router;
