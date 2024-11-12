import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/modules/Users/entities/users.entity';
import { Location } from 'src/modules/Location/entities/location.entity';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';

@Entity('Caja')
export class Caja {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único de la caja', example: 'uuid-1234' })
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Fecha de creación de la caja', example: '2024-11-12T07:00:00Z' })
  fecha: Date;

  @Column()
  @ApiProperty({ description: 'Saldo inicial de la caja', example: 1000 })
  saldoInicial: number;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.caja)
  @ApiProperty({ description: 'Lista de movimientos asociados a la caja', type: [Movimiento] })
  movimiento: Movimiento[];

  @Column()
  @ApiProperty({ description: 'Ingreso en efectivo', example: 500 })
  ingresoEfectivo: number;

  @Column()
  @ApiProperty({ description: 'Ingreso con tarjeta', example: 300 })
  ingresoTarjeta: number;

  @Column()
  @ApiProperty({ description: 'Cargo a la habitación', example: 200 })
  cargoHabitacion: number;

  @Column()
  @ApiProperty({ description: 'Egresos de la caja', example: 100 })
  egresos: number;

  @OneToOne(() => Users, (users) => users.id)
  @ApiProperty({ description: 'Usuario asociado a la caja', type: Users })
  usuario: Users;

  @OneToOne(() => Location, (location) => location.name)
  @ApiProperty({ description: 'Ubicación asociada a la caja', type: Location })
  ubicacion: Location;
}
