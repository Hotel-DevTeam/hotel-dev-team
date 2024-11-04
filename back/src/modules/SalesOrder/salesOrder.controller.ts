import { Controller, Post, Body } from '@nestjs/common';
import { SalesOrderService } from './salesOrder.service';
import { CreateSalesOrderDto } from './dto/salesOrder.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Sales Orders')
@Controller('salesOrders')
@ApiBearerAuth()
export class SalesOrderController {
  constructor(private salesOrderService: SalesOrderService) {}

  @Post()
  createSalesOrder(@Body() createSalesOrderDto: CreateSalesOrderDto) {
    return this.salesOrderService.createSalesOrder(createSalesOrderDto);
  }
}
