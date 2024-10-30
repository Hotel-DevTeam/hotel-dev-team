import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Users } from '../../Users/entities/users.entity';
import { Room } from '../../Rooms/entities/rooms.entity';
import { Caja } from 'src/modules/caja/entities/caja.entity';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => Users, (user) => user.location)
  admin: Users;

  @OneToMany(() => Room, (room) => room.location)
   rooms: Room[];

   @OneToMany(() => Caja, (caja) => caja.ubicacion)
    caja: Caja[];
}
