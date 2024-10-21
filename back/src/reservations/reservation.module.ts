import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservation.controller';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationService],
})
export class ReservationModule {}
