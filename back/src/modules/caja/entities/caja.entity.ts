import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Estado, Movimiento } from "../caja.enum";
import { Users } from "src/modules/Users/entities/users.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { Location } from "src/modules/Location/entities/location.entity";


@Entity('Caja')
export class Caja {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, user => user.caja, { nullable: false })
    usuario: Users;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    descripcion: string;

    @Column({
        type: 'enum',
        enum: Estado,       
    })
    Estado: Estado;

    @OneToOne(() => Product, product => product.id, { nullable: true })
    producto: Product;

    @ManyToOne(() => Location, location => location.id, { nullable: false })
    ubicacion: Location;

    @Column({
        type: 'enum',
        enum: Movimiento,        
    })
    tipoMovimiento: Movimiento;


    @CreateDateColumn({ type: 'timestamp' })
    fecha: Date;
}
