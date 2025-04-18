import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Location } from '../../Location/entities/location.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  capacity: number;

  @Column()
  price: number;

  @Column()
  type: string; // ej single, double, suite

  @ManyToOne(() => Location, (location) => location.rooms, {eager: true})
  location: Location;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}
