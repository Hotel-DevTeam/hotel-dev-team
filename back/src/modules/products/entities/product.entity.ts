import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tipo } from "../products.enum";
import { IsEnum, IsUrl } from "class-validator";
import { Location } from "src/modules/Location/entities/location.entity";

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: Tipo,
    })
    @IsEnum(Tipo)
    tipo:Tipo

    @Column()
    nombre: string

    @Column({
        default:true
    })
    Activo: boolean

    @Column()
    @IsUrl()
    foto:string

    @ManyToOne(() => Location, (location) => location.products)
    ubicacion: Location;




}

