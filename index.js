const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);


app.get('/',(req,res)=>{
  res.send('Hola');
});

app.listen(port, ()=>{
  console.log("Mi port "+port);
});
