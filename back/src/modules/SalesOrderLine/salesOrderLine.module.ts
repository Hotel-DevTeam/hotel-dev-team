import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderLineService } from './salesOrderLine.service';
import { SalesOrderLineController } from './salesOrderLine.controller';
import { SalesOrderLineRepository } from './salesOrderLine.repository';
import { SalesOrderLine } from './entities/salesOrderLine.entity';
import { Product } from '../products/entities/product.entity';
import { AuthModule } from '../Auth/auth.module';
import { UsersModule } from '../Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesOrderLine, Product]),
    AuthModule,
    UsersModule,
  ],
  providers: [SalesOrderLineService, SalesOrderLineRepository],
  controllers: [SalesOrderLineController],
  exports: [SalesOrderLineRepository], 
})
export class SalesOrderLineModule {}

