import { producto } from "./classproducto";
export class listproduct extends producto{

  constructor(){
      this.list = [];
  }

  addproduct(p){

      if(this.existe()==false){

          this.list.pop(p);
          return true;

      }else{ return false; }
  }

  setproduct(p){
  // falta sacar producto de la lista
  }
  buscarproduct(codp){

      this.list.forEach(px =>  {

          if(px.retcodigo()==codp){ return px;}


       });

       return null;


  }
  existe(p){

   this.list.forEach(px =>  {

      if(px===p){ return true;}


   });

   return false;

  }

  retlista(){ return this.list;}



}
