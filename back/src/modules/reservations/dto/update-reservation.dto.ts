import { ApiProperty } from '@nestjs/swagger';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(
  OmitType(CreateReservationDto, [
    'pax',
    'ubicacion',
    'roomType',
    'addPax',
  ] as const),
) {
  @ApiProperty({
    description: 'ID de la nueva habitación a la que se cambia la reserva',
    required: false,
  })
  roomId?: string;
}
