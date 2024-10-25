import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Name of the location' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Address of the location' })
  @IsNotEmpty()
  @IsString()
  address: string;
}
