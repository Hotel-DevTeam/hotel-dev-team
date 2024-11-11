import { Users } from 'src/modules/Users/entities/users.entity';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';
import { Location } from 'src/modules/Location/entities/location.entity';

export class CreateCajaDto {
  saldoInicial: number;

  movimiento: Movimiento[];

  ingresoEfectivo: number;

  ingresoTarjeta: number;

  cargoHabitacion: number;

  egresos: number;

  usuario: Users; //ver logica para usuario logeado para sacar propiedad del dto

  ubicacion: Location; ////ver logica para usuario logeado para sacar propiedad del dto
}
