import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderLineRepository } from './salesOrderLine.repository';
import { CreateSalesOrderLineDto } from './dto/salesOrderLine.dto';

@Injectable()
export class SalesOrderLineService {
  constructor(
    @InjectRepository(SalesOrderLineRepository)
    private salesOrderLineRepository: SalesOrderLineRepository,
  ) {}

  async createSalesOrderLine(createSalesOrderLineDto: CreateSalesOrderLineDto) {
    const line = this.salesOrderLineRepository.create(createSalesOrderLineDto);
    return this.salesOrderLineRepository.save(line);
  }
}
