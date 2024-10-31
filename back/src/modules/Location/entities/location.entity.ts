import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from '../../Users/entities/users.entity';
import { Room } from '../../Rooms/entities/rooms.entity';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  imgUrl:string;

  @ManyToOne(() => Users, (user) => user.location)
  admin: Users;

  @OneToMany(() => Room, (room) => room.location)
  rooms: Room[];
}
