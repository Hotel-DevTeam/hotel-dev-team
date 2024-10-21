import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reservation.dto';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {}
