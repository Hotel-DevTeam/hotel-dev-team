import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderRepository } from './salesOrder.repository';
import { CreateSalesOrderDto } from './dto/salesOrder.dto';

@Injectable()
export class SalesOrderService {
  constructor(
    @InjectRepository(SalesOrderRepository)
    private salesOrderRepository: SalesOrderRepository,
  ) {}

  async createSalesOrder(createSalesOrderDto: CreateSalesOrderDto) {
    const order = this.salesOrderRepository.create(createSalesOrderDto);
    return this.salesOrderRepository.save(order);
  }
}
