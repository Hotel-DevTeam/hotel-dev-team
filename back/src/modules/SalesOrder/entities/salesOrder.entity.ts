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
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.CONFIRMED })
  status: SaleStatus;

  @OneToMany(() => SalesOrderLine, (salesOrderLine) => salesOrderLine.order, {
    cascade: true,
  })
  orderLines: SalesOrderLine[];

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;
}
