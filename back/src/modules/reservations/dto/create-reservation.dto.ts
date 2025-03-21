import { ApiProperty } from '@nestjs/swagger';
import { CreateLocationDto } from 'src/modules/Location/dto/create-location.dto';
import { CreatePaxDto } from 'src/modules/pax/dto/create-pax.dto';
import { CreateRoomDto } from 'src/modules/Rooms/dto/create-room.dto';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Indica si el huésped ingresó al hotel',
    example: true,
  })
  checkIn: boolean;

  @ApiProperty({
    description: 'Fecha de Ingreso',
    example: '2024-02-10',
  })
  checkInDate: Date;

  @ApiProperty({
    description: 'Indica si el huésped se retiró del hotel',
    example: false,
  })
  checkOut: boolean;

  @ApiProperty({
    description: 'Fecha de Egreso',
    example: '2024-02-25',
  })
  checkOutDate: Date;

  @ApiProperty({ description: 'Información del pasajero', type: CreatePaxDto })
  pax: CreatePaxDto;

  @ApiProperty({ description: 'Número de pasajeros', example: 1 })
  PaxNum: number;

  @ApiProperty({
    description: 'Tipo de pasajero (ejemplo: 1 para adulto, 2 para niño)',
    example: 1,
  })
  paxType: number;

  @ApiProperty({
    description: 'Plataforma origen de la reserva',
    example: 'Booking.com',
  })
  bookingPlatform: string;

  @ApiProperty({ description: 'Ubicación', type: CreateLocationDto })
  ubicacion: CreateLocationDto;

  @ApiProperty({ description: 'Tipo de habitación', type: CreateRoomDto })
  roomType: CreateRoomDto;

  @ApiProperty({ description: 'Indica si incluye desayuno', example: true })
  breakfast: boolean;

  @ApiProperty({ description: 'Precio en pesos argentinos', example: 15000.5 })
  priceArg: number;

  @ApiProperty({ description: 'Precio en dólares', example: 100.0 })
  priceUsd: number;

  @ApiProperty({
    description: 'Depósito/seña en pesos argentinos',
    example: 5000.0,
  })
  depositArg: number;

  @ApiProperty({ description: 'Depósito/seña en dólares', example: 50.0 })
  depositUsd: number;

  @ApiProperty({ description: 'Saldo restante', example: 10000.0 })
  balance: number;

  @ApiProperty({
    description: 'Indica si la reserva está completada',
    example: true,
  })
  completed: boolean;

  @ApiProperty({
    description: 'Detalles extra sobre el pax o la reserva',
    example: ['Pax en silla de ruedas', 'Reserva cancelada'],
  })
  notasAdicionales: string[];

  @ApiProperty({
    description: 'Hora de llegada',
    example: '12:00',
  })
  arrival: string;

  @ApiProperty({
    description: 'Pasajeros Adicionales',
    type: CreatePaxDto,
    isArray: true
  })
  addPax: CreatePaxDto[];
}