import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoomDto {

  @ApiProperty({
    description: 'Número de habitación',
    example: '512',
  })
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'Nombre de la habitación o número',
    example: 'Habitación 512',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Para cuantas personas',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({
    description: 'Precio de la habitación',
    example: 15000,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Tipo de habitación',
    example: 'single',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Room ID associated with the location', required: false })
  @IsOptional()
  @IsUUID()  
  locationId?: string;
}

export class UpdateRoomDto extends PickType(CreateRoomDto, [
  'name',
  'capacity',
  'price',
]) {}
