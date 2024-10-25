import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';
import { RoomsRepository } from '../Rooms/room.repository';
import { RoomService } from '../Rooms/rooms.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([LocationRepository, RoomsRepository]),
  ],
  controllers: [LocationController],
  providers: [LocationService, RoomService],
})
export class LocationModule {}
