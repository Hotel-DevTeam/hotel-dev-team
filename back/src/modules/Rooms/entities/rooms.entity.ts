import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Location } from '../../Location/entities/location.entity';
import { Reservation } from '../../../reservations/entities/reservation.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  type: string; // ej single, double, suite

  @Column()
  price: number;

  @ManyToOne(() => Location, (location) => location.rooms)
  location: Location;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}
