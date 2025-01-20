import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { SaleStatus } from '../entities/salesOrder.entity';

export class CreateSalesOrderDto {
  @ApiProperty({ description: 'ID del usuario', type: String })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID de la ubicación', type: String })
  @IsUUID()
  locationId: string;

  @ApiProperty({
    description: 'Estado de la venta',
    enum: SaleStatus,
    default: SaleStatus.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(SaleStatus)
  status?: SaleStatus;

  @ApiProperty({
    description: 'Monto total de la orden (se calcula automáticamente)',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;
}

