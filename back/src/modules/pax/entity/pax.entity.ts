import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pax' })
export class Pax {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID del pasajero', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre del pasajero', example: 'Juan' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Apellido del pasajero', example: 'Pérez' })
  lastname: string;

  @Column({ unique: true }) 
  @ApiProperty({ description: 'Número de DNI o pasaporte del pasajero', example: '12345678' })
  dniPassport: string;

  @Column({ unique: true }) 
  @ApiProperty({ description: 'Email del pasajero', example: 'juan.perez@example.com' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de teléfono del pasajero', example: '+54 9 11 1234 5678'})
  phone: string; 

  @Column({ nullable: true })
  @ApiProperty({ description: 'Fecha de nacimiento del pasajero', example: '1990-01-01', type: String, format: 'date' })
  birthdate: Date; 

  @OneToMany(() => Reservation, (reservation) => reservation.pax) 
  @ApiProperty({ description: 'Reservas asociadas al usuario' })
  reservations: Reservation[];

  @Column({ default: true }) 
  @ApiProperty({ description: 'Indica si el pasajero está activo', example: true })
  isActive: boolean;
}
