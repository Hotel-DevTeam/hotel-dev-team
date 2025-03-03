import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SalesOrderLine } from './entities/salesOrderLine.entity';

@Injectable()
export class SalesOrderLineRepository extends Repository<SalesOrderLine> {
  constructor(private dataSource: DataSource) {
    super(SalesOrderLine, dataSource.createEntityManager());
  }
}

