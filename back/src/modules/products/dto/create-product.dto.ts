import { ApiProperty } from '@nestjs/swagger';
import { Tipo } from '../products.enum';

export class CreateProductDto {
  @ApiProperty({
    description: 'Tipo de producto',
    example: 'Consumible/Servicio',
  })
  tipo: Tipo;

  @ApiProperty({ description: 'Nombre del producto', example: 'Coca Cola' })
  nombre: string;

  @ApiProperty({
    description: 'Indica si el producto está activo',
    example: true,
    default: true,
  })
  Activo: boolean;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://www.example.com/image.jpg',
  })
  foto: string;

  //location
}
