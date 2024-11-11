import { Users } from "src/modules/Users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estado, TipoMovimiento } from "../../caja/caja.enum";
import { Product } from "src/modules/products/entities/product.entity";
import { Location } from "src/modules/Location/entities/location.entity";

@Entity('Movimiento')
export class Movimiento {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    fecha: Date;

    @ManyToOne(() => Users, user => user.movimiento, { nullable: false })
    usuario: Users;

  @Column()
  descripcion: string;

  @Column({
    type: 'enum',
    enum: Estado,
  })
  Estado: Estado;

    @Column({
        default:'Hecho',
        type: 'enum',
        enum: Estado,       
    })
    estado: Estado;

  @ManyToOne(() => Location, (location) => location.id, { nullable: false })
  ubicacion: Location;

  @Column({
    type: 'enum',
    enum: Movimiento,
  })
  tipoMovimiento: Movimiento;

}

