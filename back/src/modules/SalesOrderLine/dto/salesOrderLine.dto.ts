import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt} from 'class-validator';

export class CreateSalesOrderLineDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto' })
  unitPrice: number;

  @ApiProperty({ description: 'ID de la orden a la que pertenece' })
  @IsUUID()
  orderId: string;
}
