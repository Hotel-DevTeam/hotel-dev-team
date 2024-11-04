import { Controller, Post, Body } from '@nestjs/common';
import { SalesOrderLineService } from './salesOrderLine.service';
import { CreateSalesOrderLineDto } from './dto/salesOrderLine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Sales Order Lines')
@Controller('salesOrderLines')
@ApiBearerAuth()
export class SalesOrderLineController {
  constructor(private salesOrderLineService: SalesOrderLineService) {}

  @Post()
  createSalesOrderLine(@Body() createSalesOrderLineDto: CreateSalesOrderLineDto) {
    return this.salesOrderLineService.createSalesOrderLine(createSalesOrderLineDto);
  }
}
