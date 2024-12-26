import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderService } from './salesOrder.service';
import { SalesOrderController } from './salesOrder.controller';
import { SalesOrderRepository } from './salesOrder.repository';
import { MovimientosService } from '../caja/movimientos/movimientos.service';
import { MovimientosModule } from '../caja/movimientos/movimientos.module';
import { SalesOrderLineModule } from '../SalesOrderLine/salesOrderLine.module';
import { SalesOrderLineRepository } from '../SalesOrderLine/salesOrderLine.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrderRepository]), MovimientosModule, SalesOrderLineModule, ProductsModule],
  providers: [SalesOrderService, SalesOrderLineRepository],
  controllers: [SalesOrderController],
})
export class SalesOrderModule {}
