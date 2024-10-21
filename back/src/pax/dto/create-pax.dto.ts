import { ApiProperty } from '@nestjs/swagger';

export class CreatePaxDto {
  @ApiProperty({ description: 'Nombre del pasajero', example: 'Juan' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del pasajero', example: 'Pérez' })
  apellido: string;

  @ApiProperty({ description: 'Número de DNI o pasaporte del pasajero', example: '12345678' })
  dniPasaporte: string;

  @ApiProperty({ description: 'Email del pasajero', example: 'juan.perez@example.com' })
  email: string;

  @ApiProperty({ description: 'Número de teléfono del pasajero', example: '+54 9 11 1234 5678' })
  telefono: string; 

  @ApiProperty({ description: 'Fecha de nacimiento del pasajero', example: '1990-01-01' })
  fechaNacimiento: Date; 

  @ApiProperty({ description: 'Indica si el pasajero está activo', example: true, default: true })
  isActive: boolean;
}
