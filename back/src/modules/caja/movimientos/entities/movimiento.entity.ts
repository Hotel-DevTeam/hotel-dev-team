import { Users } from 'src/modules/Users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estado, TipoMovimiento } from '../../caja/caja.enum';
import { Location } from 'src/modules/Location/entities/location.entity';
import { Caja } from '../../caja/entities/caja.entity';

@Entity('Movimiento')
export class Movimiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Users, (user) => user.movimiento, { nullable: false })
  usuario: Users;

  @Column()
  descripcion: string;

  @Column({
    default: 'Hecho',
    type: 'enum',
    enum: Estado,
  })
  estado: Estado;

  @ManyToOne(() => Location, (location) => location.id, { nullable: false })
  ubicacion: Location;

  @Column({
    type: 'enum',
    enum: TipoMovimiento,
  })
  tipoMovimiento: TipoMovimiento;

  @Column({ type: 'enum', enum: ['ingreso', 'egreso'], default: 'ingreso' })
  tipo: 'ingreso' | 'egreso';


  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  monto: number;

  @ManyToOne(() => Caja, (caja) => caja.movimiento)
  @JoinColumn({ name: 'cajaId' }) // En caso de tener una columna de relación
  caja: Caja;
}
