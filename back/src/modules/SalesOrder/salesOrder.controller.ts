import { Controller, Post, Body, Param } from '@nestjs/common';
import { SalesOrderService } from './salesOrder.service';
import { CreateSalesOrderDto } from './dto/salesOrder.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ConfirmSalesOrderDto } from './dto/confirmOrder.dto';

@ApiTags('Sales Orders')
@Controller('salesOrders')
@ApiBearerAuth()
export class SalesOrderController {
  constructor(private salesOrderService: SalesOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden de venta' })
  createSalesOrder(@Body() createSalesOrderDto: CreateSalesOrderDto) {
    return this.salesOrderService.createSalesOrder(createSalesOrderDto);
  }


  @Post('confirm/:id')
@ApiOperation({
  summary: 'Confirmar una orden de venta',
  description: 'Este endpoint cambia el estado de la orden a "CONFIRMED", calcula el monto total y genera un movimiento en la caja.',
})
@ApiParam({ name: 'id', description: 'ID de la orden de venta', type: String })
@ApiBody({ type: ConfirmSalesOrderDto })
async confirmOrder(
  @Param('id') id: string,
  @Body() confirmSalesOrderDto: ConfirmSalesOrderDto,
) {
  await this.salesOrderService.confirmOrder(id, confirmSalesOrderDto.userId, confirmSalesOrderDto.productId);
}
}



