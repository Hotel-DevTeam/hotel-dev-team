import { ApiProperty } from '@nestjs/swagger';
import { Pax } from 'src/modules/pax/entity/pax.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from 'src/modules/Rooms/entities/rooms.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID de la reserva', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Indica si el huésped ingresó al hotel' })
  checkIn: boolean;

  @Column()
  @ApiProperty({ description: 'Indica si el huésped se retiró del hotel' })
  checkOut: boolean;

  @ManyToOne(() => Pax, (pax) => pax.reservations) 
  @ApiProperty({ description: 'Pasajero asociado a la reserva' })
  pax: Pax; 

  @Column()
  @ApiProperty({ description: 'Número de personas', example: 2 })
  PaxNum: number;

  @Column()
  @ApiProperty({ description: 'Tipo de pasajero' })
  paxType: number;

  @Column()
  @ApiProperty({ description: 'Plataforma origen de la reserva', example: 'Booking.com' })
  bookingPlatform: string;

  @Column()
  @ApiProperty({ description: 'Indica si incluye desayuno' })
  breakfast: boolean;

  @Column('decimal', { precision: 20, scale: 2 })
  @ApiProperty({ description: 'Precio en pesos argentinos', example: 15000.50 })
  priceArg: number;

  @Column('decimal', { precision: 20, scale: 2 })
  @ApiProperty({ description: 'Precio en dólares', example: 100.00 })
  priceUsd: number;

  @Column('decimal', { precision: 20, scale: 2 })
  @ApiProperty({ description: 'Depósito/seña en pesos argentinos', example: 5000.00 })
  depositArg: number;

  @Column('decimal', { precision: 20, scale: 2 })
  @ApiProperty({ description: 'Depósito/seña en dólares', example: 50.00 })
  depositUsd: number;

  @Column('decimal', { precision: 20, scale: 2 })
  @ApiProperty({ description: 'Saldo restante', example: 10000.00 })
  balance: number;

  @Column()
  @ApiProperty({ description: 'Indica si la reserva está completada'})
  completed: boolean;

  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;
}
