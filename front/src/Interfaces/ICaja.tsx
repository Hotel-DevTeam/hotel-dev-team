export interface ICaja {
    id: string;
    fecha: string;
    saldoInicial: number;
    ingresoEfectivo: number;
    ingresoTarjeta: number;
    cargoHabitacion: number;
    egresos: number;
  }
  

  export interface ICreateCaja {
    saldoInicial: number;
    movimientoIds: string[];
    ingresoEfectivo: number;
    ingresoTarjeta: number;
    cargoHabitacion: number;
    egresos: number;
    usuarioId: string;
    ubicacionId: string;
  }
  