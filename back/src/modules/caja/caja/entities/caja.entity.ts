import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';
import { Users } from 'src/modules/Users/entities/users.entity';
import { Location } from 'src/modules/Location/entities/location.entity';

@Entity('Caja')
export class Caja {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column()
  saldoInicial: number;

  //revisar esta lógica
  @OneToMany(() => Movimiento, (movimiento) => movimiento.id)
  movimiento: Movimiento[];

  //hacer logica para las siguientes entidades
  @Column()
  ingresoEfectivo: number;

  @Column()
  ingresoTarjeta: number;

  @Column()
  cargoHabitacion: number;

  @Column()
  egresos: number;

  @OneToOne(() => Users, (users) => users.id)
  usuario: Users;

  @OneToOne(() => Location, (location) => location.name)
  ubicacion: Location;
}
