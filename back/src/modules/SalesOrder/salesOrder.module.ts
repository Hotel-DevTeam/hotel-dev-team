import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderService } from './salesOrder.service';
import { SalesOrderController } from './salesOrder.controller';
import { SalesOrderRepository } from './salesOrder.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrderRepository])],
  providers: [SalesOrderService],
  controllers: [SalesOrderController],
})
export class SalesOrderModule {}
