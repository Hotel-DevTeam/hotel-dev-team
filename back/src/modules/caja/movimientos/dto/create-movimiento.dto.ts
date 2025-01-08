import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/modules/Location/entities/location.entity';
import { Users } from 'src/modules/Users/entities/users.entity';
import { Estado, TipoMovimiento } from '../../caja/caja.enum';
import { Product } from 'src/modules/products/entities/product.entity';

export class CreateMovimientoDto {
  @ApiProperty({
    description: 'Usuario que realiza el movimiento',
    type: () => Users,
  })
  usuario: Users; //ver lógica usuario logeado para poder sacar del dto

  @ApiProperty({
    description: 'Monto del movimiento',
    example: 100.5,
  })
  monto: number;

  @ApiProperty({
    description: 'Descripción del movimiento',
    example: 'Pago de servicios',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Estado del movimiento',
    enum: Estado,
  })
  estado: Estado;

  @ApiProperty({
    description: 'Producto relacionado con el movimiento',
  })
  producto: Product;

  @ApiProperty({
    description: 'Ubicación del movimiento',
  })
  ubicacion: Location; 

  @ApiProperty({
    description: 'Tipo de movimiento',
    enum: TipoMovimiento,
  })
  tipoMovimiento: TipoMovimiento;
}
