import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoomDto {

  @ApiProperty({
    description: 'Nombre de la habitación o número',
    example: 'Habitación 512'
  })
  @IsNotEmpty()
  name: string;

    @ApiProperty({
      description: 'Para cuantas personas',
      example: '2'
    })
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @ApiProperty({
      description: 'Precio de la habitación',
      example: '$15.000'
    })
    @IsNotEmpty()
    price: number;
  }

  export class UpdateRoomDto extends PickType(CreateRoomDto,['name', 'capacity', 'price']){}
  