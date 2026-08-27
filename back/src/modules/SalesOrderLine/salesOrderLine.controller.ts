import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SalesOrderLineService } from './salesOrderLine.service';
import { CreateSalesOrderLineDto } from './dto/salesOrderLine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { RolesGuard } from '../Auth/guards/roles.guard';

@ApiTags('Sales Order Lines')
@Controller('salesOrderLines')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class SalesOrderLineController {
  constructor(private salesOrderLineService: SalesOrderLineService) {}

  @Post()
  createSalesOrderLine(
    @Body() createSalesOrderLineDto: CreateSalesOrderLineDto,
  ) {
    return this.salesOrderLineService.createSalesOrderLine(
      createSalesOrderLineDto,
    );
  }
}
