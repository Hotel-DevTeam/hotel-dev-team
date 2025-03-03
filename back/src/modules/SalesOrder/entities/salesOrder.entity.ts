import { ApiProperty } from '@nestjs/swagger'; 
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Users } from '../../Users/entities/users.entity';
import { SalesOrderLine } from '../../SalesOrderLine/entities/salesOrderLine.entity';
import { Location } from '../../Location/entities/location.entity';

export enum SaleStatus {
  DRAFT = 'draft',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}

@Entity({ name: 'SalesOrder' })
export class SalesOrder {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID de la orden de venta', type: String })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Monto total de la orden', type: Number })
  totalAmount: number;

  @ManyToOne(() => Users, (user) => user.id)
  @ApiProperty({ description: 'Usuario que realiza la orden', type: Users })
  user: Users;

  @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.CONFIRMED })
  @ApiProperty({
    description: 'Estado de la venta',
    enum: SaleStatus,
    default: SaleStatus.CONFIRMED,
  })
  status: SaleStatus;

  @OneToMany(() => SalesOrderLine, (salesOrderLine) => salesOrderLine.order, {
    cascade: true,
  })
  @ApiProperty({ description: 'Líneas de la orden de venta', type: [SalesOrderLine] })
  orderLines: SalesOrderLine[];
  

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de la creación de la orden', type: Date })
  date: Date;

  @ManyToOne(() => Location, (location) => location.id)
  @ApiProperty({ description: 'Ubicación de la orden', type: Location })
  location: Location;
}


