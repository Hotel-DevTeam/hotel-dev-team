import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"reservas"
})
export class Reserva {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    checkIn:boolean

    @Column()
    checkOut: boolean

    /* @Column()
    habitacion: //idEntidadHabitacion */

    @Column()
    pax: string

    @Column()
    cantPax: number

    @Column()
    paxType: number

    @Column()
    bookingPlatform: string

    @Column()
    desayuno: boolean

    @Column('decimal', { precision: 20, scale: 2 })
    precioArg: number;

    @Column('decimal', { precision: 20, scale: 2 })
    precioUsd: number;

    @Column('decimal', { precision: 20, scale: 2 })
    señaArg: number;

    @Column('decimal', { precision: 20, scale: 2 })
    señaUsd: number;

    @Column('decimal', { precision: 20, scale: 2 })
    saldo: number;

    @Column()
    finalizada: boolean

}


