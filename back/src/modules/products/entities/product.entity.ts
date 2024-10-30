import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tipo } from "../products.enum";
import { IsEnum, IsUrl } from "class-validator";

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

    //location




}



/* -Tipo: Selección (Consumible, servicio)
-Nombre
-Activo: Buleano (defecto True)
-Foto: Char, para un URL
-Ubicación: Apunta a ubicación
*/