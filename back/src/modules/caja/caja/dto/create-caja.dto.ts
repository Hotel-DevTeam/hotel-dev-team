import { Users } from "src/modules/Users/entities/users.entity";
import { Movimiento } from "../caja.enum";

export class CreateCajaDto {

    fecha: Date;
    usuario: Users;
    monto: number;
    /* formadepago: string */
    categoria: Movimiento;

}
