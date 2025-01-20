import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderService } from './salesOrder.service';
import { SalesOrderController } from './salesOrder.controller';
import { MovimientosModule } from '../caja/movimientos/movimientos.module';
import { SalesOrderLineModule } from '../SalesOrderLine/salesOrderLine.module';
import { SalesOrderLineRepository } from '../SalesOrderLine/salesOrderLine.repository';
import { ProductsModule } from '../products/products.module';
import { SalesOrder } from './entities/salesOrder.entity';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from '../products/products.repository';
import { UsersModule } from '../Users/users.module';
import { LocationModule } from '../Location/location.module'; 
import { UsersRepository } from '../Users/users.repository';
import { Users } from '../Users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesOrder, Product, Users]),
    MovimientosModule,
    SalesOrderLineModule,
    ProductsModule,
    UsersModule,
    LocationModule, 
  ],
  providers: [
    SalesOrderService,
    SalesOrderLineRepository,
    ProductRepository,
  ],
  controllers: [SalesOrderController],
})
export class SalesOrderModule {}


