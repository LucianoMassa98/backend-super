export class Cuenta{

  constructor (codigo,nombre){

      this.nombre=nombre;
      this.codigo = codigo;
      this.debe = 0;
      this.haber = 0;
  }
   saldo(){
       return (this.debe-this.haber);
      }
   retname(){
       return this.nombre;
      }
   retcodigo(){
       return this.codigo;
      }
   retdebe(){
       return this.debe;
      }
   rethaber(){
       return this.haber;
      }
   retcuenta(){
       return this.codigo+"|"+this.nombre;
      }

      adddebe(valor){
          this.debe = this.debe + valor;
      }
      addhaber(valor){
          this.haber = this.haber + valor;
      }

      setdebe(valor){ this.debe = this.debe -valor;}
      sethaber(valor){this.haber = this.haber - valor;}

  }

