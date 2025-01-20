import { ApiProperty } from '@nestjs/swagger';

export class ConfirmSalesOrderDto {
  @ApiProperty({ description: 'ID del usuario que confirma la orden' })
  userId: string;

  @ApiProperty({ description: 'ID del producto relacionado con la venta' })
  productId: string;
}