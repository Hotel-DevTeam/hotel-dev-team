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

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    descripcion: string;

    @Column({
        default:'Hecho',
        type: 'enum',
        enum: Estado,       
    })
    estado: Estado;

    @OneToOne(() => Product, product => product.id, { nullable: true })
    producto: Product;

    @ManyToOne(() => Location, location => location.id, { nullable: false })
    ubicacion: Location;

    @Column({
        type: 'enum',
        enum: TipoMovimiento,        
    })
    tipoMovimiento: TipoMovimiento;


}

