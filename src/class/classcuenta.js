export class Cuenta{

  constructor (codigo,nombre){

      this.nombre=nombre;
      this.codigo = codigo;
      this.debe = 0;
      this.haber = 0;
  }

generador(){

    this.cuentas = [
      {
        codigo: '1',
        nombre: 'ACTIVO',
        debe: 0,
        haber: 0,
      },
      {
        codigo: '1.1',
        nombre: 'efectivo',
        debe: 0,
        haber: 0
      },
      {
        codigo: '1.2',
        nombre: 'cuenta corriente',
        debe: 0,
        haber: 0
      },
      {
        codigo: '1.3',
        nombre: 'debito',
        debe: 0,
        haber: 0
      },

      {codigo: '2',
      nombre: 'PASIVO',
      debe: 0,
      haber: 0
      },
      {
        codigo: '2.1',
        nombre: 'Empleados',
        debe: 0,
        haber: 0
      },
      {
        codigo: '2.1.1',
        nombre: 'Producion',
        debe: 0,
        haber: 0
      }
    ];

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

