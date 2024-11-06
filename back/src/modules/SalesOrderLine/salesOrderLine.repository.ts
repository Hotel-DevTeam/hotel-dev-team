import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalesOrderLine } from './entities/salesOrderLine.entity';

@Injectable()
export class SalesOrderLineRepository extends Repository<SalesOrderLine> {}
