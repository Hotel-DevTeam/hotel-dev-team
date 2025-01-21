export interface ICaja {
    id: string;
    fecha: string;
    saldoInicial?: number;
    saldoFinal?: number;
    ingresoEfectivo: number;
    ingresoTarjeta: number;
    cargoHabitacion: number;
    egresos: number;
  }
  

  export interface ICreateCaja {
    saldoInicial: number;
    saldoFinal: number;
    ingresoEfectivo: number;
    ingresoTarjeta: number;
    cargoHabitacion: number;
    egresos: number;
    usuarioId: string;
    ubicacionId: string;
  }
  
  
  export interface ICloseCaja {
    saldoInicial?: number;
    saldoFinal: number;
    ingresoEfectivo: number;
    ingresoTarjeta: number;
    cargoHabitacion: number;
    egresos: number;
    usuarioId?: string;
    ubicacionId?: string;
  }