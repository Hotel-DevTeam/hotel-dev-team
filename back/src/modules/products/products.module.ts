import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products.repository';
import { LocationModule } from '../Location/location.module'; 
import { Location } from '../Location/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Location]), LocationModule], 
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductRepository, ProductsService],
})
export class ProductsModule {}

