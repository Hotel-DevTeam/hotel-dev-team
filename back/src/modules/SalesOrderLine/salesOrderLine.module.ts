import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderLineService } from './salesOrderLine.service';
import { SalesOrderLineController } from './salesOrderLine.controller';
import { SalesOrderLineRepository } from './salesOrderLine.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrderLineRepository])],
  providers: [SalesOrderLineService],
  controllers: [SalesOrderLineController],
})
export class SalesOrderLineModule {}
