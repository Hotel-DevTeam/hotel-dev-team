import { ApiProperty } from '@nestjs/swagger';
import { CreatePaxDto } from 'src/pax/dto/create-pax.dto';

export class CreateReservationDto {
  @ApiProperty({ description: 'Indica si el huésped ingresó al hotel', example: true })
  checkIn: boolean;

  @ApiProperty({ description: 'Indica si el huésped se retiró del hotel', example: false })
  checkOut: boolean;

  @ApiProperty({ description: 'Información del pasajero', type: CreatePaxDto }) 
  pax: CreatePaxDto;

  @ApiProperty({ description: 'Número de pasajeros', example: 1 }) 
  PaxNum: number;

  @ApiProperty({ description: 'Tipo de pasajero (ejemplo: 1 para adulto, 2 para niño)', example: 1 })
  paxType: number;

  @ApiProperty({ description: 'Plataforma origen de la reserva', example: 'Booking.com' })
  bookingPlatform: string;

  @ApiProperty({ description: 'Indica si incluye desayuno', example: true })
  breakfast: boolean;

  @ApiProperty({ description: 'Precio en pesos argentinos', example: 15000.50 })
  priceArg: number;

  @ApiProperty({ description: 'Precio en dólares', example: 100.00 })
  priceUsd: number;

  @ApiProperty({ description: 'Depósito/seña en pesos argentinos', example: 5000.00 })
  depositArg: number;

  @ApiProperty({ description: 'Depósito/seña en dólares', example: 50.00 })
  depositUsd: number;

  @ApiProperty({ description: 'Saldo restante', example: 10000.00 })
  balance: number;

  @ApiProperty({ description: 'Indica si la reserva está completada', example: true })
  completed: boolean;
}
