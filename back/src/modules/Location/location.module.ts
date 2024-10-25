import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';
import { Room } from '../Rooms/entities/rooms.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([LocationRepository, RoomRepository]),
  ],
  controllers: [LocationController],
  providers: [LocationService, RoomService],
})
export class LocationModule {}
