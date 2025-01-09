import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderLineService } from './salesOrderLine.service';
import { SalesOrderLineController } from './salesOrderLine.controller';
import { SalesOrderLineRepository } from './salesOrderLine.repository';
import { SalesOrderLine } from './entities/salesOrderLine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrderLine])],
  providers: [SalesOrderLineService, SalesOrderLineRepository],
  controllers: [SalesOrderLineController],
  exports: [SalesOrderLineRepository], 
})
export class SalesOrderLineModule {}

