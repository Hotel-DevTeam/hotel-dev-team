import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrderLineRepository } from './salesOrderLine.repository';
import { CreateSalesOrderLineDto } from './dto/salesOrderLine.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SalesOrderLineService {
  constructor(
    @InjectRepository(SalesOrderLineRepository)
    private salesOrderLineRepository: SalesOrderLineRepository,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createSalesOrderLine(createSalesOrderLineDto: CreateSalesOrderLineDto) {
    const { productId, ...rest } = createSalesOrderLineDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const line = this.salesOrderLineRepository.create({
      ...rest,
      product,
      lineTotal: createSalesOrderLineDto.quantity * createSalesOrderLineDto.unitPrice,
    });
    return this.salesOrderLineRepository.save(line);
  }
}
