import { PartialType } from '@nestjs/swagger';
import { CreateCajaDto } from './create-caja.dto';

export class UpdateCajaDto extends PartialType(CreateCajaDto) {}
