import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SalesOrder } from '../../SalesOrder/entities/salesOrder.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'SalesOrderLine' })
export class SalesOrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lineTotal: number;

  @ManyToOne(() => SalesOrder, (order) => order.orderLines)
  order: SalesOrder;
}
