import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
