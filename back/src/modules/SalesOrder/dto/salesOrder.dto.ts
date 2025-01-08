import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SaleStatus } from '../entities/salesOrder.entity';

export class CreateSalesOrderDto {
  @ApiProperty({ description: 'ID del usuario' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID de la ubicación' })
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
}
