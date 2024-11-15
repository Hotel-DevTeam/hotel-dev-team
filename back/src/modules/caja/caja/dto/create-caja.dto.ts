import { ApiProperty } from "@nestjs/swagger";

export class CreateCajaDto {
  @ApiProperty({ description: 'Saldo inicial de la caja', example: 1000 })
  saldoInicial: number;

  @ApiProperty({ description: 'IDs de los movimientos asociados a la caja', type: [String] })
  movimientoIds: string[];

  @ApiProperty({ description: 'Ingreso en efectivo', example: 500 })
  ingresoEfectivo: number;

  @ApiProperty({ description: 'Ingreso con tarjeta', example: 300 })
  ingresoTarjeta: number;

  @ApiProperty({ description: 'Cargo a la habitación', example: 200 })
  cargoHabitacion: number;

  @ApiProperty({ description: 'Egresos de la caja', example: 100 })
  egresos: number;

  @ApiProperty({ description: 'ID del usuario asociado a la caja', example: 'user-id' })
  usuarioId: string;

  @ApiProperty({ description: 'ID de la ubicación de la caja', example: 'location-id' })
  ubicacionId: string;
}
