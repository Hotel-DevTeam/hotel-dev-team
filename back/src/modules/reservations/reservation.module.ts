import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Pax } from 'src/modules/pax/entity/pax.entity';
import { Room } from 'src/modules/Rooms/entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Pax, Room])],
  controllers: [ReservationsController],
  providers: [ReservationService],
})
export class ReservationModule {}
