import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Name of the location' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Address of the location' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'img Url', example: 'https://res.cloudinary.com/dju6fgtcl/image/upload/v1731508529/depto_tse3cr.jpg' })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    description: 'Room ID associated with the admin',
    required: false,
  })
  @IsUUID()
  adminId?: string;
}

export class UpdateLocationDto extends PickType(CreateLocationDto, [
  'name',
  'address',
]) {}
