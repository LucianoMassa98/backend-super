// para debuggear errores
function longError(err,req,res,next){

  console.error(err);
  next(err);
}

//crear un formato
function errorHandler(err,req,res,next){
  res.status(500).json({
    mesagge: err.message,
    stack: err.stack
  });
}
//detectar error tipo boom
function boomErrorHandler(err,req,res,next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.status).json(output.payload);
  }else{next(err);}

}
module.exports = {longError,errorHandler,boomErrorHandler};
