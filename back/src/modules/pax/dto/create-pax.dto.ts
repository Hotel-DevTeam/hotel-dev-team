import { ApiProperty } from '@nestjs/swagger';

export class CreatePaxDto {
  @ApiProperty({ description: 'Nombre del pasajero', example: 'Juan' })
  name: string;

  @ApiProperty({ description: 'Apellido del pasajero', example: 'Pérez' })
  lastname: string;

  @ApiProperty({
    description: 'Número de DNI o pasaporte del pasajero',
    example: '12345678',
  })
  dniPassport: string;

  @ApiProperty({
    description: 'Email del pasajero',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del pasajero',
    example: '+54 9 11 1234 5678',
  })
  phone: string;

  @ApiProperty({
    description: 'Dirección del pasajero',
    example: 'Calle 123',
  })
  address: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del pasajero',
    example: '1990-01-01',
  })
  birthdate: Date;

  @ApiProperty({
    description: 'Indica si el pasajero está activo',
    example: true,
    default: true,
  })
  isActive: boolean;
}
